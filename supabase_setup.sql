-- ============================================================
-- Run this in the Supabase SQL Editor:
-- Dashboard → SQL Editor → New Query → paste & click Run
-- ============================================================

-- Projects table
create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  category    text,
  description text,
  image       text,
  challenge   text,
  solution    text,
  results     text,
  created_at  timestamptz default now()
);

-- Blog posts table
create table if not exists blogs (
  id        text primary key,
  title     text not null,
  excerpt   text,
  category  text,
  date      text,
  author    text,
  read_time text,
  image     text
);

-- Site settings table (one row, key = 'profile')
create table if not exists settings (
  key           text primary key,
  profile_image text
);

-- Seed a default settings row so the profile image can be upserted
insert into settings (key, profile_image)
values ('profile', '/profile-avatar.jpg')
on conflict (key) do nothing;

-- ============================================================
-- Storage bucket: portfolio-images  (public)
-- Create manually in Dashboard → Storage → New Bucket
-- Name: portfolio-images  ✓ Public bucket
-- ============================================================

-- RLS: allow anonymous reads, authenticated writes
-- (For a simple admin site, disabling RLS is easiest.
--  Go to each table → Auth → Disable RLS.)
--  OR run the lines below to enable open access:

alter table projects enable row level security;
create policy "Public read projects"  on projects for select using (true);
create policy "Auth write projects"   on projects for all    using (true);

alter table blogs enable row level security;
create policy "Public read blogs"  on blogs for select using (true);
create policy "Auth write blogs"   on blogs for all    using (true);

alter table settings enable row level security;
create policy "Public read settings"  on settings for select using (true);
create policy "Auth write settings"   on settings for all    using (true);

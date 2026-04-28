-- ============================================================
-- STORAGE POLICIES
-- Run this in the Supabase SQL Editor to allow image uploads
-- ============================================================

-- 1. Allow public to view images (already handled by public bucket, but good to have)
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'portfolio-images' );

-- 2. Allow anyone to upload images (simplest for admin setup)
create policy "Public Upload"
  on storage.objects for insert
  with check ( bucket_id = 'portfolio-images' );

-- 3. Allow anyone to update/replace images
create policy "Public Update"
  on storage.objects for update
  using ( bucket_id = 'portfolio-images' );

-- 4. Allow anyone to delete images
create policy "Public Delete"
  on storage.objects for delete
  using ( bucket_id = 'portfolio-images' );

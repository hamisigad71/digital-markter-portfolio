'use client';

import { useState, useEffect } from "react";
import { Save, UserCircle, Shield, Globe, CheckCircle2 } from "lucide-react";
import { getSettings, saveSettings, Settings } from "@/lib/store";
import ImageUpload from "./ImageUpload";

export default function SettingsManager() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const load = async () => {
      const s = await getSettings();
      setSettings(s);
    };
    load();
    window.addEventListener("settings-updated", load);
    return () => window.removeEventListener("settings-updated", load);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setIsSaving(true);
    await saveSettings(settings);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 400);
  };

  if (!settings) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900">Site Settings</h2>
            <p className="text-zinc-500 text-sm">Configure your personal brand and site-wide properties.</p>
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-medium text-sm text-white transition-all w-full md:w-auto"
            style={{ background: "linear-gradient(135deg, #ffcc00, #e8900a)", boxShadow: "0 4px 14px rgba(255,170,23,0.3)" }}
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Saving...
              </span>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>

        {showSuccess && (
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3 text-green-700 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="h-5 w-5" />
            <p className="text-sm font-medium">Settings updated successfully!</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main settings column */}
          <div className="md:col-span-2 space-y-6">
            <section className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-50">
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <UserCircle className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-zinc-900">Brand Identity</h3>
              </div>

              <div className="space-y-6">
                <ImageUpload 
                  label="Profile Image"
                  value={settings.profileImage}
                  onChange={(val) => setSettings({ ...settings, profileImage: val })}
                />
                
                <p className="text-xs text-zinc-400 leading-relaxed">
                  This image is used across the site, including the Hero section and About page. For best results, use a high-quality square photo of yourself.
                </p>
              </div>
            </section>

            <section className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-sm">
               <div className="flex items-center gap-3 pb-4 border-b border-zinc-50">
                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-zinc-900">SEO & Metadata</h3>
              </div>
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                <p className="text-xs text-zinc-500 font-medium italic">Site name and global meta-descriptions will be added to the next update.</p>
              </div>
            </section>
          </div>

          {/* Sidebar info column */}
          <div className="space-y-6">
            <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-6 space-y-4">
              <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                <Shield className="h-5 w-5" />
              </div>
              <h4 className="font-medium text-amber-900">Privacy & Security</h4>
              <p className="text-sm text-amber-800/70 leading-relaxed">
                Changes to these settings take effect immediately across all public pages. Be sure to verify your changes in a new tab.
              </p>
            </div>
            
            <div className="bg-zinc-900 rounded-3xl p-8 text-white space-y-4 shadow-lg shadow-zinc-200">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Quick Tip</p>
              <h4 className="font-medium text-lg leading-tight">Optimizing Site Performance</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                When uploading images directly, we recommend keeping file sizes under 200KB for the fastest loading speeds for your visitors.
              </p>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

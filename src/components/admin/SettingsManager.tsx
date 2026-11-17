'use client';

import { useState, useEffect } from "react";
import { Save, UserCircle, Shield, Globe, CheckCircle2, Loader2 } from "lucide-react";
import { getSettings, saveSettings, Settings } from "@/lib/store";
import ImageUpload from "./ImageUpload";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SettingsManager() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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
      toast.success("Settings saved successfully!", {
        description: "Your site profile and hero image have been updated.",
      });
    }, 300);
  };

  if (!settings) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-extrabold text-foreground">Global Site Settings</h2>
            <p className="text-muted-foreground text-sm">Configure your personal brand, primary photo, and site-wide metadata.</p>
          </div>
          <Button
            type="submit"
            disabled={isSaving}
            className="rounded-xl h-11 px-6 font-semibold shrink-0"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main settings column */}
          <div className="md:col-span-2 space-y-6">
            <section className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <UserCircle className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Brand Identity & Hero Portrait</h3>
              </div>

              <div className="space-y-4">
                <ImageUpload 
                  label="Profile Portrait"
                  value={settings.profileImage}
                  onChange={(val) => setSettings({ ...settings, profileImage: val })}
                />
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This portrait appears in the main Hero section, About page, and case study previews. A professional headshot creates immediate authority.
                </p>
              </div>
            </section>

            <section className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">SEO & Metadata</h3>
              </div>
              <div className="p-4 bg-muted/40 rounded-2xl border border-border/60">
                <p className="text-xs text-muted-foreground font-medium">
                  Dynamic OG social preview meta tags, title prefixes, and verification tokens are managed via Next.js metadata in <code className="text-primary font-mono font-semibold">src/app/layout.tsx</code>.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar info column */}
          <div className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Instant Sync</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Changes take effect immediately across all client-rendered sections. No page reloads or code redeploys required.
              </p>
            </div>
            
            <div className="bg-card border border-border/80 rounded-3xl p-6 text-foreground space-y-3 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono">Performance Best Practice</p>
              <h4 className="font-bold text-base leading-tight">Image Compression</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Upload compressed WebP or JPEG files under 300KB to guarantee sub-second LCP (Largest Contentful Paint) for maximum SEO rankability.
              </p>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

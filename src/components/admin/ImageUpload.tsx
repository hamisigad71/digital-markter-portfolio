'use client';

import { useState, useRef } from "react";
import { Upload, Link2, X, ImageIcon, Loader2 } from "lucide-react";
import { handleImageUpload } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Props {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(!value || value.startsWith('http') || value.startsWith('/'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const base64 = await handleImageUpload(file);
      onChange(base64);
      setShowUrlInput(false);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed", {
        description: "Your file might be too large or there was an issue connecting to Supabase storage.",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleClear = () => {
    onChange("");
    setShowUrlInput(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const base64 = await handleImageUpload(file);
        onChange(base64);
        setShowUrlInput(false);
        toast.success("Image uploaded successfully!");
      } catch (err) {
        console.error("Upload failed", err);
        toast.error("Upload failed", {
          description: "Check your file size or Supabase storage permissions.",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="space-y-2.5">
      {label && (
        <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <ImageIcon className="h-3 w-3" />
          {label}
        </label>
      )}

      <div className="relative group" onDragOver={handleDragOver} onDrop={handleDrop}>
        {value ? (
          <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-border bg-card">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />

            {/* Hover overlay with actions */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-xs transition-opacity flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <Button
                type="button"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl shadow-md gap-1.5"
              >
                {isUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                <span>{isUploading ? "Uploading…" : "Replace"}</span>
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleClear}
                className="rounded-xl shadow-md gap-1.5"
              >
                <X className="h-3.5 w-3.5" />
                <span>Remove</span>
              </Button>
            </div>

            {/* Bottom label */}
            <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-background/80 to-transparent">
              <p className="text-[10px] text-foreground font-mono font-medium truncate bg-card/80 backdrop-blur-md py-0.5 px-2 rounded-md inline-block max-w-full border border-border/40">
                {value.startsWith('data:') ? 'Local Base64 Image' : value}
              </p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="h-44 w-full border-2 border-dashed border-border/80 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/60 hover:bg-muted/30 transition-colors group"
          >
            {isUploading ? (
              <Loader2 className="h-7 w-7 text-primary animate-spin" />
            ) : (
              <>
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <Upload className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">Click to upload or drag & drop</p>
                  <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG, WebP — up to 50MB</p>
                </div>
              </>
            )}
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* URL input row */}
      <div className="flex items-center gap-3">
        {showUrlInput ? (
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              value={value.startsWith('data:') ? '' : value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Or paste an image URL (Unsplash, Pinterest, etc.)…"
              className="pl-9 h-9 text-xs"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowUrlInput(true)}
            className="text-xs font-semibold text-primary hover:underline transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Link2 className="h-3 w-3" />
            Use direct image URL instead
          </button>
        )}
      </div>

      {value.length > 500000 && (
        <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium bg-amber-500/10 border border-amber-500/20 p-2 rounded-xl">
          ⚠️ Large file size detected. For optimal mobile load times, prefer compressed WebP images under 300KB.
        </p>
      )}
    </div>
  );
}

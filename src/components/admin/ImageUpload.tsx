'use client';

import { useState, useRef } from "react";
import { Upload, Link2, X, ImageIcon, Loader2 } from "lucide-react";
import { handleImageUpload } from "@/lib/store";

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
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload image. Your file might be too large for Supabase storage (default limit is 50MB).");
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
      } catch (err) {
        console.error("Upload failed", err);
        alert("Upload failed. Check your Supabase storage limits.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="space-y-2.5">
      {label && (
        <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          <ImageIcon className="h-3 w-3" />
          {label}
        </label>
      )}

      <div className="relative group" onDragOver={handleDragOver} onDrop={handleDrop}>
        {value ? (
          <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />

            {/* Hover overlay with actions */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-zinc-900 font-medium text-xs shadow-lg hover:bg-amber-400 hover:text-white transition-all"
              >
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {isUploading ? "Uploading…" : "Replace"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-red-500 font-medium text-xs shadow-lg hover:bg-red-500 hover:text-white transition-all"
              >
                <X className="h-4 w-4" />Remove
              </button>
            </div>

            {/* Bottom label */}
            <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/30 to-transparent">
              <p className="text-[10px] text-white font-medium truncate bg-black/40 backdrop-blur-md py-1 px-2 rounded-lg inline-block max-w-full">
                {value.startsWith('data:') ? 'Uploaded Image' : value}
              </p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="h-44 w-full border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-amber-400 hover:bg-amber-50/30 transition-all group"
          >
            {isUploading ? (
              <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
            ) : (
              <>
                <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-amber-100 group-hover:text-amber-600 transition-all">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-zinc-900 group-hover:text-amber-700">Click to upload</p>
                  <p className="text-xs text-zinc-400">PNG, JPG, WebP — max 50MB</p>
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

      {/* Always-visible upload button when image is set */}
      {value && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-zinc-200 text-zinc-500 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/30 transition-all text-xs font-medium disabled:opacity-50"
        >
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {isUploading ? "Uploading…" : "Upload New Image"}
        </button>
      )}

      {/* URL input row */}
      <div className="flex items-center gap-3">
        {showUrlInput ? (
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              value={value.startsWith('data:') ? '' : value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Or paste an image URL…"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/10 transition-all"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowUrlInput(true)}
            className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
          >
            <Link2 className="h-3 w-3" />
            Use URL instead
          </button>
        )}
      </div>

      {value.length > 500000 && (
        <p className="text-[10px] text-orange-500 font-medium bg-orange-50 p-2 rounded-lg">
          ⚠️ Large image detected. Use WebP or compressed images for faster load times.
        </p>
      )}
    </div>
  );
}

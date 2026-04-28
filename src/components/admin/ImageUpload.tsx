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
      alert("Failed to upload image. Please try a smaller file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    onChange("");
    setShowUrlInput(true);
  };

  return (
    <div className="space-y-2.5">
      {label && (
        <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          <ImageIcon className="h-3 w-3" />
          {label}
        </label>
      )}

      <div className="relative group">
        {value ? (
          <div className="relative h-40 w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 transition-all group-hover:border-amber-200">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-zinc-500 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
               <p className="text-[10px] text-white font-medium truncate bg-black/40 backdrop-blur-md py-1 px-2 rounded-lg inline-block max-w-full">
                 {value.startsWith('data:') ? 'Encoded Image Data' : value}
               </p>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="h-40 w-full border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-amber-400 hover:bg-amber-50/30 transition-all group"
          >
            {isUploading ? (
              <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
            ) : (
              <>
                <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-amber-100 group-hover:text-amber-600 transition-all">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-zinc-900 group-hover:text-amber-700">Click to upload</p>
                  <p className="text-xs text-zinc-400">or drag and drop</p>
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

      <div className="flex items-center gap-3">
        {showUrlInput ? (
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              value={value.startsWith('data:') ? '' : value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Paste image URL instead..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/10 transition-all"
            />
          </div>
        ) : (
          <button 
            onClick={() => setShowUrlInput(true)}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
          >
            <Link2 className="h-3 w-3" />
            Use URL instead
          </button>
        )}
        
        {!value && !showUrlInput && (
          <button 
            onClick={() => setShowUrlInput(true)}
            className="text-xs font-bold text-zinc-500 hover:text-zinc-700"
          >
            Or use URL
          </button>
        )}
      </div>
      
      {value.length > 500000 && (
         <p className="text-[10px] text-orange-500 font-medium bg-orange-50 p-2 rounded-lg">
           ⚠️ Large image detected. High quality uploads might slow down the site. Try to use WebP or compressed images.
         </p>
      )}
    </div>
  );
}

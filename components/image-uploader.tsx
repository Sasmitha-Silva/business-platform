"use client";

import { useRef } from "react";
import Image from "next/image";
import { Upload, Camera, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: "square" | "banner" | "video";
  heightClass?: string;
  className?: string;
}

export function ImageUploader({
  value,
  onChange,
  label,
  aspectRatio = "square",
  heightClass = "h-28",
  className = "",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="text-xs font-semibold text-slate-700 block">{label}</label>}

      <div
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer border border-dashed border-slate-300 hover:border-[#D41367] rounded-xl ${heightClass} bg-slate-50/70 hover:bg-pink-50/30 transition-all flex flex-col items-center justify-center text-center overflow-hidden`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {value ? (
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-2 backdrop-blur-xs">
              <RefreshCw className="w-3.5 h-3.5" /> Change Image
            </div>
          </div>
        ) : (
          <div className="py-2.5 px-4 space-y-1 flex flex-col items-center my-auto">
            <div className="w-7 h-7 rounded-lg bg-white text-[#D41367] shadow-xs flex items-center justify-center border border-slate-200 group-hover:scale-105 transition-transform">
              <Upload className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-slate-800">Click or drag file to upload</span>
            <span className="text-[11px] text-slate-400 font-normal">PNG, JPG, WebP up to 10MB</span>
          </div>
        )}
      </div>
    </div>
  );
}

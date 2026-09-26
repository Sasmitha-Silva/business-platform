"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Camera, RefreshCw, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { getUploadUrlAction, deleteStorageObjectAction } from "@/app/actions/storage";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: "logos" | "covers" | "products" | "documents" | "uploads";
  aspectRatio?: "square" | "banner" | "video";
  heightClass?: string;
  className?: string;
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth || img.width, height: img.naturalHeight || img.height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Unable to read image dimensions."));
    };
    img.src = url;
  });
}

export function ImageUploader({
  value,
  onChange,
  label,
  folder = "uploads",
  aspectRatio = "square",
  heightClass = "h-32",
  className = "",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState(false);

  const isSquare = aspectRatio === "square";

  // Reset previewError whenever value changes
  useEffect(() => {
    setPreviewError(false);
  }, [value]);

  const uploadFile = async (file: File) => {
    // 1. Validation: JPEG or PNG only
    const isJpegOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      !!file.name.match(/\.(jpe?g|png)$/i);

    if (!isJpegOrPng) {
      setErrorMessage("Please select a JPEG or PNG image file (.jpg, .jpeg, .png).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Image file must be smaller than 10MB.");
      return;
    }

    // 2. Square aspect ratio validation for logo
    if (isSquare) {
      try {
        const dims = await getImageDimensions(file);
        const ratio = dims.width / dims.height;
        // Allow slight variance (0.85 to 1.18), but reject non-square images (e.g. banners, landscapes, portraits)
        if (ratio < 0.85 || ratio > 1.18) {
          setErrorMessage(
            `Please select a square image (1:1 ratio) for the logo. Selected image is ${dims.width}×${dims.height}px.`
          );
          return;
        }
      } catch (err) {
        console.warn("Could not check image dimensions:", err);
      }
    }

    setErrorMessage(null);
    setPreviewError(false);
    setIsUploading(true);

    try {
      let finalUrl = "";

      // Try 1: Presigned R2 URL direct upload
      try {
        const presigned = await getUploadUrlAction({
          filename: file.name,
          contentType: file.type || "image/jpeg",
          folder,
        });

        if (presigned.success && presigned.uploadUrl && presigned.publicUrl) {
          const putRes = await fetch(presigned.uploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": file.type || "image/jpeg",
            },
            body: file,
          });

          if (putRes.ok) {
            finalUrl = presigned.publicUrl;
          }
        }
      } catch (presignedErr) {
        console.warn("Direct R2 presigned upload error, falling back to server route:", presignedErr);
      }

      // Try 2: Server API route fallback (handles cases where R2 bucket CORS is not configured)
      if (!finalUrl) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const apiRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await apiRes.json();
        if (data.success && data.publicUrl) {
          finalUrl = data.publicUrl;
        } else {
          throw new Error(data.error || "Failed to upload image.");
        }
      }

      onChange(finalUrl);
    } catch (err: any) {
      console.error("Upload error:", err);
      setErrorMessage(err.message || "Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handlePromptDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmDelete(true);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmDelete(false);
  };

  const handleConfirmDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    const oldUrl = value;
    onChange("");
    setErrorMessage(null);

    if (oldUrl && (oldUrl.startsWith("http://") || oldUrl.startsWith("https://"))) {
      try {
        await deleteStorageObjectAction(oldUrl);
      } catch (err) {
        console.warn("Error deleting file from storage:", err);
      }
    }
    setIsDeleting(false);
    setShowConfirmDelete(false);
  };

  return (
    <div className={`space-y-1.5 ${isSquare ? "flex flex-col items-center text-center" : ""} ${className}`}>
      {label && <label className="text-xs font-semibold text-slate-700 block text-center">{label}</label>}

      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`relative group cursor-pointer border border-dashed ${
          isSquare
            ? "w-36 h-36 sm:w-44 sm:h-44 aspect-square rounded-2xl mx-auto"
            : `w-full ${heightClass} rounded-xl`
        } transition-all flex flex-col items-center justify-center text-center overflow-hidden ${
          errorMessage
            ? "border-red-300 bg-red-50/30"
            : "border-slate-300 hover:border-[#D41367] bg-slate-50/70 hover:bg-pink-50/30"
        } ${isUploading ? "pointer-events-none opacity-80" : ""}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/jpg"
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center justify-center gap-2 p-4 text-[#D41367]">
            <Loader2 className="w-6 h-6 animate-spin text-[#D41367]" />
            <span className="text-xs font-semibold text-slate-700">Uploading image</span>
            <span className="text-[10px] text-slate-400">Please wait a moment</span>
          </div>
        ) : value && !previewError ? (
          <div className="relative w-full h-full rounded-lg overflow-hidden group/img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Uploaded preview"
              className="w-full h-full object-cover"
              onError={() => setPreviewError(true)}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-2 backdrop-blur-xs">
              <RefreshCw className="w-3.5 h-3.5" /> Change Image
            </div>
            <button
              type="button"
              onClick={handlePromptDelete}
              title="Remove image"
              className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/90 hover:bg-red-700 text-white opacity-0 group-hover/img:opacity-100 transition-opacity shadow-sm z-10 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* In-place Confirmation Dialog */}
            {showConfirmDelete && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-0 bg-slate-900/95 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center z-30 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-1.5 border border-red-500/30">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </div>
                <p className="text-xs font-bold text-white leading-tight">Remove this image?</p>
                <p className="text-[10px] text-slate-300 mt-0.5 mb-2.5">This will permanently delete the file from storage.</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCancelDelete}
                    disabled={isDeleting}
                    className="px-3 py-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className="px-3 py-1 text-[11px] font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    {isDeleting && <Loader2 className="w-3 h-3 animate-spin" />}
                    <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-2.5 px-3 space-y-1 flex flex-col items-center my-auto">
            <div className="w-8 h-8 rounded-lg bg-white text-[#D41367] shadow-xs flex items-center justify-center border border-slate-200 group-hover:scale-105 transition-transform">
              <Upload className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-800 leading-tight">
              {isSquare ? "Upload Square Logo" : "Click or drag file to upload"}
            </span>
            <span className="text-[10px] text-slate-400 font-normal leading-tight">
              {isSquare ? "1:1 square ratio (JPEG, PNG)" : "JPEG or PNG up to 10MB"}
            </span>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="flex items-center gap-1.5 text-[11px] text-red-600 font-medium pt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

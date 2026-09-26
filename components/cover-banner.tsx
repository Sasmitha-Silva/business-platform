"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface CoverBannerProps {
  src?: string | null;
  alt: string;
}

export function CoverBanner({ src, alt }: CoverBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth === 0) {
        setHasError(true);
      } else {
        setIsLoaded(true);
      }
    }
  }, [src]);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-[#1e1b4b] overflow-hidden select-none">
      {src && src.trim() !== "" && !hasError && (
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className={`object-cover transition-opacity duration-300 pointer-events-none select-none ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          unoptimized
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}

interface BusinessLogoProps {
  src?: string | null;
  name: string;
}

export function BusinessLogo({ src, name }: BusinessLogoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth === 0) {
        setHasError(true);
      } else {
        setIsLoaded(true);
      }
    }
  }, [src]);

  const initial = name ? name.trim().charAt(0).toUpperCase() : "B";

  return (
    <div className="w-full h-full relative rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-[#D41367] to-[#B80E56] flex items-center justify-center text-white font-black text-xl sm:text-3xl shadow-inner select-none">
      <span className="relative z-0 select-none">{initial}</span>
      {src && src.trim() !== "" && !hasError && (
        <Image
          ref={imgRef}
          src={src}
          alt={name}
          fill
          sizes="88px"
          className={`object-cover rounded-lg sm:rounded-xl z-10 transition-opacity duration-300 pointer-events-none select-none ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          unoptimized
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}

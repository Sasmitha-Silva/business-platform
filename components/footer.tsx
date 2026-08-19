"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Heart } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  // Hide footer on auth & dashboard routes
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/moderator") ||
    pathname.startsWith("/register")
  ) {
    return null;
  }

  return (
    <footer className="bg-[#D41367] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/20">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center">
            <div>
              <span className="text-lg font-black tracking-tight text-white block leading-tight">
                Rotaract Network
              </span>
              <span className="text-xs text-pink-100/90 font-medium">
                Verified Rotaract Business &amp; Professional Directory
              </span>
            </div>
          </div>

          {/* Clean Streamlined Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-white">
            <Link href="/directory" className="hover:text-pink-200 transition-colors">
              Directory
            </Link>
            <Link href="/categories" className="hover:text-pink-200 transition-colors">
              Categories
            </Link>
            <Link href="/about" className="hover:text-pink-200 transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-pink-200 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-pink-200 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-pink-200 transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-pink-100/90">
          <p>© {new Date().getFullYear()} RSAMDIO. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-xs text-white">
            <span className="text-pink-100/90">Designed &amp; Developed by</span>
            <a
              href="https://sasmitha.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white hover:text-pink-200 underline underline-offset-4 transition-colors"
            >
              Sasmitha.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

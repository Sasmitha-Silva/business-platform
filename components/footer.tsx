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
    <footer className="bg-white border-t border-border/80 text-foreground py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border/60">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#D41367] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-[#D41367] block leading-tight">
                Rotaract Network
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Verified Rotaract Business & Professional Directory
              </span>
            </div>
          </div>

          {/* Clean Streamlined Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold text-muted-foreground">
            <Link href="/directory" className="hover:text-[#D41367] transition-colors">
              Directory
            </Link>
            <Link href="/categories" className="hover:text-[#D41367] transition-colors">
              Categories
            </Link>
            <Link href="/about" className="hover:text-[#D41367] transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-[#D41367] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#D41367] transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-[#D41367] transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Rotaract Business Network. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Driven by</span>
            <Heart className="w-3.5 h-3.5 text-[#D41367] fill-[#D41367]" />
            <span className="font-semibold text-foreground">&quot;Service Above Self&quot;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

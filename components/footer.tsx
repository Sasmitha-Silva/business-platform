"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Heart, Mail, Phone, MapPin, Users } from "lucide-react";

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
    <footer className="bg-white border-t border-border/80 text-foreground pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border/60">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D41367] flex items-center justify-center text-white">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#D41367]">
                Rotaract Network
              </span>
            </Link>

            <p className="text-muted-foreground text-xs leading-relaxed max-w-sm">
              Connecting verified Rotaract entrepreneurs, service leaders, and corporate partners committed to professional excellence and Rotary ethics worldwide.
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
              <ShieldCheck className="w-4 h-4 text-[#D41367]" />
              <span>Verified Membership Directory</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D41367]">
              PLATFORM
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/directory" className="text-muted-foreground hover:text-[#D41367] transition-colors">
                  Business Directory
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-[#D41367] transition-colors">
                  Industry Categories
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-[#D41367] transition-colors">
                  Rotaract Districts
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-[#D41367] transition-colors">
                  How Verification Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Organization & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D41367]">
              STANDARDS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-[#D41367] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/verification-standards" className="text-muted-foreground hover:text-[#D41367] transition-colors">
                  Verification Tiers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-[#D41367] transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D41367]">
              LEGAL & PRIVACY
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-[#D41367] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-[#D41367] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Rotaract Business Network. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Driven by Rotary Ethos of</span>
            <Heart className="w-3.5 h-3.5 text-[#D41367] fill-[#D41367]" />
            <span className="font-semibold text-foreground">&quot;Service Above Self&quot;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

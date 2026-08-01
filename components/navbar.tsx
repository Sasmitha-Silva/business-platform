"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navbar on auth, dashboard, admin, moderator, and register routes
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
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <nav
        className={cn(
          "max-w-6xl mx-auto px-6 py-2.5 rounded-2xl pointer-events-auto transition-all duration-300 flex items-center justify-between border ring-1 ring-black/10 text-white",
          scrolled
            ? "bg-[#B80E56]/95 backdrop-blur-2xl shadow-2xl shadow-[#D41367]/30 border-white/25 scale-[0.98]"
            : "bg-[#D41367] backdrop-blur-xl shadow-2xl shadow-[#D41367]/25 border-white/20"
        )}
      >
        {/* Brand Emblem */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8.5 h-8.5 rounded-xl bg-white text-[#D41367] flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
            <Users className="w-4.5 h-4.5" />
          </div>
          <span className="text-[17px] font-black tracking-tight text-white flex items-center gap-1 whitespace-nowrap">
            Rotaract <span className="text-pink-200">Network</span>
          </span>
        </Link>

        {/* Center Floating Segmented Nav */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-black/15 backdrop-blur-md border border-white/15">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4.5 py-1.5 rounded-lg text-[13px] font-bold transition-all duration-200 whitespace-nowrap",
                  isActive
                    ? "bg-white text-[#D41367] shadow-md font-extrabold"
                    : "text-white/85 hover:text-white hover:bg-white/15 font-semibold"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 text-xs font-medium shrink-0">
          <Link
            href="/auth/login"
            className="px-4 py-1.5 font-bold text-[13px] text-white/90 hover:text-white hover:bg-white/15 rounded-xl transition-colors whitespace-nowrap"
          >
            Login
          </Link>
          <Button
            className="bg-white hover:bg-pink-50 text-[#D41367] rounded-xl px-5 py-2 text-[13px] font-extrabold shadow-md shadow-black/15 hover:scale-[1.03] active:scale-[0.97] transition-all whitespace-nowrap"
            asChild
          >
            <Link href="/register">
              <span>Register Your Business</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden pointer-events-auto">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/20 text-white">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-warm-bg p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 pb-6 border-b border-border/60">
                  <div className="w-9 h-9 rounded-2xl bg-[#D41367] flex items-center justify-center text-white shadow-sm">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <SheetTitle className="text-[#D41367] font-extrabold text-base leading-tight">
                      Rotaract Network
                    </SheetTitle>
                    <p className="text-[10px] text-muted-foreground font-medium">Official Business Platform</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-6">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all",
                          isActive
                            ? "bg-[#D41367] text-white shadow-sm"
                            : "text-foreground/80 hover:bg-pink-50/70 hover:text-[#D41367]"
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="w-4 h-4 opacity-60" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-border/60">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-3 text-xs font-bold text-foreground hover:text-[#D41367] bg-white rounded-2xl border border-border/60 shadow-sm"
                >
                  Login to Account
                </Link>
                <Button className="w-full bg-[#D41367] hover:bg-[#B80E56] text-white rounded-2xl py-3 text-xs font-extrabold shadow-md shadow-[#D41367]/20" asChild>
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    Register Your Business
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

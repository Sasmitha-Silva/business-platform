"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight, Users, ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-xs py-3.5"
          : "bg-transparent border-b border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <Link href="/" className="flex items-center group shrink-0">
          <span className="text-lg sm:text-[20px] font-black tracking-tight text-slate-900 flex items-center gap-1">
            Rotaract <span className="text-[#D41367]">Network</span>
          </span>
        </Link>

        {/* Center: Clean Horizontal Nav Links with Hover Micro-Animations */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-[15px] sm:text-base font-semibold transition-all duration-300 group inline-flex flex-col items-center",
                  isActive ? "text-[#D41367] font-extrabold" : "text-slate-700 hover:text-[#D41367]"
                )}
              >
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                  {link.label}
                </span>
                {/* Expanding Underline Hover Animation */}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-[#D41367] rounded-full transition-all duration-300 origin-center",
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-6 shrink-0">
          <Link
            href="/auth/login"
            className="relative py-1 text-[15px] sm:text-base font-bold text-slate-700 hover:text-[#D41367] transition-all duration-300 group inline-flex flex-col items-center"
          >
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
              Log in
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D41367] rounded-full transition-all duration-300 origin-center scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100" />
          </Link>
          <Button
            variant="outline"
            className="border-2 border-[#D41367] text-[#D41367] hover:bg-[#D41367] hover:text-white bg-transparent rounded-full px-5 py-2 text-xs sm:text-sm font-extrabold shadow-2xs hover:scale-105 active:scale-95 transition-all h-auto cursor-pointer"
            asChild
          >
            <Link href="/register">
              <span>Register Business</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100 text-slate-800">
                  <Menu className="w-5 h-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-80 bg-white p-6 flex flex-col justify-between border-l border-slate-200">
              <div>
                <div className="pb-6 border-b border-slate-100">
                  <SheetTitle className="text-slate-900 font-extrabold text-base leading-tight">
                    Rotaract <span className="text-[#D41367]">Network</span>
                  </SheetTitle>
                  <p className="text-[10px] text-muted-foreground font-medium">Official Business Directory</p>
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
                          "flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all",
                          isActive
                            ? "bg-pink-50 text-[#D41367] font-extrabold"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2.5 pt-6 border-t border-slate-100">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-2.5 text-xs font-bold text-slate-800 hover:text-[#D41367] bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
                >
                  Login to Account
                </Link>
                <Button className="w-full bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl py-2.5 text-xs font-extrabold shadow-sm shadow-black/10 h-auto" asChild>
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    Register Your Business
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

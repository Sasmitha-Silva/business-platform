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

  // Lock background scrolling when mobile splash menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

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
    <>
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

          {/* Mobile Menu Trigger Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open Navigation Menu"
              className="rounded-2xl bg-white/95 text-slate-900 border border-slate-200/90 shadow-2xs hover:bg-pink-50 hover:text-[#D41367] p-2.5 h-11 w-11 flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            >
              <Menu className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= FULLSCREEN ANIMATED SPLASH MENU OVERLAY ================= */}
      <div
        className={cn(
          "fixed inset-0 z-[999] w-screen h-[100dvh] max-h-[100dvh] bg-gradient-to-br from-[#D41367] via-[#BE0E58] to-[#800028] text-white flex flex-col justify-between p-4 sm:p-8 pb-[max(1.25rem,env(safe-area-inset-bottom))] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto overscroll-contain",
          mobileOpen
            ? "opacity-100 pointer-events-auto [clip-path:circle(150%_at_calc(100%-2.5rem)_2.5rem)] scale-100"
            : "opacity-0 pointer-events-none [clip-path:circle(0%_at_calc(100%-2.5rem)_2.5rem)] scale-95"
        )}
      >
        {/* Animated Background Mesh & Light Glows */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-25">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
        </div>

        {/* Top Header Row with Brand & Close Button */}
        <div className="relative z-10 w-full flex items-center justify-between pb-3 sm:pb-4 border-b border-white/20 shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
            <span className="text-lg sm:text-xl font-black tracking-tight text-white">
              Rotaract <span className="text-pink-200">Network</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close Navigation Menu"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:rotate-90"
          >
            <span className="text-lg sm:text-xl font-black leading-none">✕</span>
          </button>
        </div>

        {/* Center Nav Links - Clean & Minimalist */}
        <div className="relative z-10 my-auto py-3 sm:py-6 space-y-2 max-w-sm w-full mx-auto">
          {[
            { href: "/directory", label: "Directory" },
            { href: "/categories", label: "Categories" },
            { href: "/how-it-works", label: "How It Works" },
            { href: "/about", label: "About Us" },
            { href: "/verification-standards", label: "Verification Standards" },
            { href: "/contact", label: "Contact Us" },
          ].map((item, idx) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "group flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl transition-all duration-300 cursor-pointer border text-sm sm:text-base font-black tracking-tight",
                  isActive
                    ? "bg-white text-[#D41367] border-white shadow-lg translate-x-1.5"
                    : "bg-white/10 hover:bg-white/20 border-white/15 text-white hover:translate-x-1.5"
                )}
                style={{
                  transitionDelay: mobileOpen ? `${idx * 30}ms` : "0ms",
                }}
              >
                <span>{item.label}</span>
                <ArrowRight
                  className={cn(
                    "w-4 h-4 transition-transform group-hover:translate-x-1",
                    isActive ? "text-[#D41367]" : "text-white/80"
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions CTA */}
        <div className="relative z-10 pt-3 sm:pt-4 border-t border-white/20 space-y-2 sm:space-y-3 shrink-0 max-w-md w-full mx-auto">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Button
              className="w-full bg-white hover:bg-pink-50 text-[#D41367] font-black text-xs sm:text-sm rounded-2xl py-2.5 sm:py-3.5 shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 h-auto cursor-pointer"
              asChild
            >
              <Link href="/register" prefetch={true} onClick={() => setMobileOpen(false)}>
                <span className="truncate">Register</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl py-2.5 sm:py-3.5 flex items-center justify-center gap-1.5 h-auto cursor-pointer"
              asChild
            >
              <Link href="/auth/login" prefetch={true} onClick={() => setMobileOpen(false)}>
                <span className="truncate">Member Login</span>
              </Link>
            </Button>
          </div>

          <div className="text-center text-[10px] sm:text-[11px] text-white/70 font-medium">
            Rotaract South Asia MDIO Enterprise Network &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
}

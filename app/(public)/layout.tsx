"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingOrStandalone = pathname === "/" || pathname.startsWith("/auth") || pathname.startsWith("/register");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className={cn("flex-1 bg-white", isLandingOrStandalone ? "pt-0" : "pt-24")}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

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
  const isStandalonePage = pathname.startsWith("/auth") || pathname.startsWith("/register");

  return (
    <>
      <Navbar />
      <main className={cn("flex-1", isStandalonePage ? "pt-0" : "pt-24")}>
        {children}
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rotaract Business Network — Verified Business Directory for Rotaractors",
    template: "%s | Rotaract Business Network",
  },
  description:
    "A premium directory connecting trusted Rotaract entrepreneurs and service leaders. Discover verified businesses, build professional connections, and grow within the Rotary community.",
  keywords: [
    "Rotaract",
    "Business Directory",
    "Verified Businesses",
    "Rotary",
    "Networking",
    "Professional Directory",
    "Rotaractor",
  ],
  openGraph: {
    title: "Rotaract Business Network",
    description:
      "Discover verified Rotaract professionals and businesses. A trusted directory for the global Rotary community.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}

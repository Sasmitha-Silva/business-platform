import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScroll } from "@/components/smooth-scroll";
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
  title: "Rotaract Business Network",
  description:
    "A verified directory connecting trusted Rotaract entrepreneurs, corporate leaders, and service-driven professionals across Rotary International districts.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
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
        <SmoothScroll />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}

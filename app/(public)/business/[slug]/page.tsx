import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, Share2, ChevronRight, ShoppingBag, Info, Flag, Award, ShieldCheck, CheckCircle2, Globe, Building2, Calendar, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/verification-badge";
import { EnquiryForm } from "@/components/enquiry-form";
import { mockBusinesses, mockProducts } from "@/lib/mock-data";

export async function generateStaticParams() {
  return mockBusinesses
    .filter((b) => b.status === "approved")
    .map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const biz = mockBusinesses.find((b) => b.slug === slug);
  if (!biz) return { title: "Business Not Found" };
  return {
    title: `${biz.name} — Rotaract Business Network`,
    description: biz.description?.slice(0, 160),
  };
}

export default async function BusinessProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = mockBusinesses.find((b) => b.slug === slug && b.status === "approved");
  if (!business) notFound();

  const products = mockProducts.filter((p) => p.business_id === business.id);
  const contact = business.contact;

  const tags = ["IT Consulting", "Cloud Migration", "Enterprise Security", "API Architecture", "SaaS Development"];

  return (
    <div className="bg-[#FAF6F4] min-h-screen pb-20">
      {/* Sleek Compact Header Container (Zero Navbar Overlap) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative min-h-[220px] sm:min-h-[250px] rounded-3xl overflow-hidden shadow-xl bg-slate-950 p-6 sm:p-8 flex flex-col justify-between border border-border">
          {/* Background Sample Image with Dark Gradient Overlay */}
          <Image
            src="/images/biz-cover.png"
            alt="Business Cover"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />

          {/* Action buttons floating top-right */}
          <div className="relative z-20 flex justify-end items-center gap-3">
            <Button className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full px-5 h-9 text-xs font-bold shadow-md gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Send Enquiry
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-white/10 border-white/30 hover:bg-white/20 h-9 w-9 text-white">
              <Share2 className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Compact Bottom Info Row */}
          <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-end gap-5 mt-4">
            {/* Logo Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-2 shadow-xl flex items-center justify-center border-2 border-white/30 shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-[#D41367] to-[#B80E56] rounded-xl flex items-center justify-center text-white font-extrabold text-3xl shadow-inner">
                {business.name.charAt(0)}
              </div>
            </div>

            {/* Business Info */}
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <VerificationBadge level={business.verification_level} size="sm" />
                <span className="bg-white/15 backdrop-blur-md text-amber-300 border border-white/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  District 3220
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {business.name}
              </h1>

              <p className="text-white/80 text-xs max-w-xl truncate">
                {business.tagline || "Innovating digital connectivity and enterprise architecture for global organizations."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stats Summary Bar */}
            <div className="bg-white rounded-3xl border border-border p-6 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-border">
              <div>
                <p className="text-xl font-extrabold text-[#D41367]">10+ Yrs</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">ESTABLISHED</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-[#F7A81B]">50+</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">PROJECTS DELIVERED</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-[#0050A2]">100%</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">ROTARY COMPLIANT</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-emerald-600">4.9 / 5</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">CLIENT RATING</p>
              </div>
            </div>

            {/* About the Business */}
            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                <Info className="w-5 h-5 text-[#D41367]" /> Executive Overview
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {business.description}
              </p>

              <div className="pt-4 border-t border-border/60">
                <p className="text-xs font-bold text-foreground mb-2.5">Core Services & Expertise:</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-pink-50 text-[#D41367] text-xs font-bold rounded-xl border border-pink-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Products & Solutions Showcase with Sample Images */}
            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#D41367]" /> Solutions & Offerings
                </h2>
                <span className="text-xs font-bold text-[#D41367]">2 Listings</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Product Card 1 with Sample Image */}
                <div className="rounded-2xl border border-border overflow-hidden bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                      <Image
                        src="/images/product-tech.png"
                        alt="Cloud Transition Suite"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-3 left-3 bg-[#D41367] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                        ENTERPRISE
                      </span>
                    </div>
                    <div className="p-5 space-y-1.5">
                      <h3 className="font-bold text-sm text-foreground">Cloud Migration & Transition Suite</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        Complete end-to-end cloud infrastructure transition, security audit, and 24/7 monitoring.
                      </p>
                      <p className="text-sm font-extrabold text-[#D41367] pt-2">From $4,999</p>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <Button className="w-full bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-9 text-xs font-bold shadow-sm">
                      Request Quote
                    </Button>
                  </div>
                </div>

                {/* Product Card 2 with Sample Image */}
                <div className="rounded-2xl border border-border overflow-hidden bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                      <Image
                        src="/images/hero-meeting.png"
                        alt="Cybersecurity Audit"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-3 left-3 bg-[#0050A2] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                        AUDIT PRO
                      </span>
                    </div>
                    <div className="p-5 space-y-1.5">
                      <h3 className="font-bold text-sm text-foreground">Cybersecurity & Vulnerability Audit Pro</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        Comprehensive vulnerability assessment, compliance mapping, and executive security reports.
                      </p>
                      <p className="text-sm font-extrabold text-[#D41367] pt-2">$1,250</p>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <Button className="w-full bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-9 text-xs font-bold shadow-sm">
                      Request Quote
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* ROTARY IDENTITY Pass Card */}
            <div className="bg-[#D41367] rounded-3xl p-7 text-white shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <p className="text-[10px] font-extrabold tracking-widest uppercase text-white/80">
                ROTARY IDENTITY PASS
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-extrabold text-lg border border-white/30 text-white shrink-0">
                  AV
                </div>
                <div>
                  <p className="font-extrabold text-base">Anand Vardhan</p>
                  <p className="text-xs text-white/85">Verified Business Owner</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-3 text-xs border-t border-white/20">
                <div className="flex items-center gap-2 text-white/90">
                  <Flag className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>Rotaract Club of Downtown</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>District 3220, Central</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>Rotary ID: <strong className="font-mono text-white">ROT-3220-8841</strong></span>
                </div>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-3">
              <h3 className="font-extrabold text-foreground text-sm">Direct Contact Channels</h3>
              <div className="space-y-2">
                <a
                  href={`tel:${contact?.mobile || "+919876543210"}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-pink-50/60 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#D41367]" />
                    <span className="text-xs font-bold">Call Direct</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#D41367] transition-colors" />
                </a>

                <a
                  href={`https://wa.me/${contact?.whatsapp?.replace(/[^0-9]/g, "") || "919876543210"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-pink-50/60 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold">WhatsApp Chat</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#D41367] transition-colors" />
                </a>

                <a
                  href={`mailto:${contact?.email || "info@lumina.com"}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-pink-50/60 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#0050A2]" />
                    <span className="text-xs font-bold">Email Desk</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#D41367] transition-colors" />
                </a>
              </div>
            </div>

            {/* Send Enquiry Form Card */}
            <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
              <EnquiryForm businessName={business.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

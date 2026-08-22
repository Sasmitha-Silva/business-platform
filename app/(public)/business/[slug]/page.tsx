import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Share2,
  ChevronRight,
  ShoppingBag,
  Info,
  Flag,
  Award,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Building2,
  Calendar,
  FileText,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
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
    title: biz.name,
    description: biz.description?.slice(0, 160),
  };
}

export default async function BusinessProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = mockBusinesses.find((b) => b.slug === slug && b.status === "approved");
  if (!business) notFound();

  const products = mockProducts.filter((p) => p.business_id === business.id);
  const contact = business.contact;

  const tags = [
    business.subcategory?.name || "Professional Services",
    "Enterprise Solutions",
    "Verified Rotary Member",
    "B2B Partner",
    "Statutory Compliant",
  ];

  const phoneNum = contact?.mobile || "+94771234567";
  const waNum = (contact?.whatsapp || phoneNum).replace(/[^0-9]/g, "");
  const emailAddr = contact?.email || "contact@rotaractbusiness.com";

  return (
    <div className="bg-white min-h-screen pb-12 sm:pb-20 pt-2 sm:pt-6">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-3.5 sm:space-y-6">

        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-muted-foreground pb-1">
          <div className="flex items-center gap-1 sm:gap-2 text-[11px] sm:text-xs">
            <Link href="/" className="hover:text-[#D41367] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <Link href="/directory" className="hover:text-[#D41367] transition-colors">
              Directory
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="text-[#D41367] font-bold truncate max-w-[120px] sm:max-w-xs">
              {business.name}
            </span>
          </div>

          <Link
            href="/directory"
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-600 hover:text-[#D41367] bg-slate-50 hover:bg-pink-50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">Directory</span>
          </Link>
        </div>

        {/* ================= HERO PROFILE BANNER CARD (Compact on Mobile) ================= */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-slate-950 p-4 sm:p-8 text-white border border-slate-800 flex flex-col justify-between min-h-[190px] sm:min-h-[290px]">
          {/* Background Cover Image */}
          <Image
            src="/images/biz-cover.png"
            alt={business.name}
            fill
            sizes="100vw"
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40 pointer-events-none" />

          {/* Top Row: Floating District & Verification Badges */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <span className="bg-white/15 backdrop-blur-md text-pink-200 border border-white/20 text-[9px] sm:text-xs font-extrabold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider">
                District 3220
              </span>
              {business.category && (
                <span className="bg-white/10 backdrop-blur-md text-white border border-white/15 text-[9px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  {business.category.name}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <VerificationBadge level={business.verification_level} size="sm" />
            </div>
          </div>

          {/* Bottom Row: Avatar, Title, Tagline & Location */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-6 mt-4 sm:mt-8">
            {/* Logo Avatar */}
            <div className="w-13 h-13 sm:w-22 sm:h-22 rounded-xl sm:rounded-2xl bg-white p-1 sm:p-1.5 shadow-xl flex items-center justify-center border-2 border-white/30 shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-[#D41367] to-[#B80E56] rounded-lg sm:rounded-xl flex items-center justify-center text-white font-black text-xl sm:text-3xl shadow-inner">
                {business.name.charAt(0)}
              </div>
            </div>

            {/* Business Info */}
            <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0">
              <h1 className="text-lg sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {business.name}
              </h1>

              <p className="text-white/85 text-[11px] sm:text-sm max-w-2xl line-clamp-2 font-medium leading-relaxed">
                {business.tagline || business.description || "Innovating enterprise architecture and certified commercial solutions for global clients."}
              </p>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5 sm:pt-1 text-[11px] sm:text-xs text-white/75 font-semibold">
                <span className="inline-flex items-center gap-1 text-pink-200">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D41367]" />
                  <span>{business.location?.city || "Colombo"}, {business.location?.country || "Sri Lanka"}</span>
                </span>
                <span>•</span>
                <span>Est. {business.year_established || 2020}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE QUICK ACTION CONTACT BAR ================= */}
        <div className="grid grid-cols-3 gap-2 sm:hidden">
          <a
            href={`tel:${phoneNum}`}
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-pink-50 text-[#D41367] border border-pink-200/80 font-extrabold text-[11px] shadow-2xs text-center active:scale-95 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#D41367]" />
            <span>Call</span>
          </a>

          <a
            href={`https://wa.me/${waNum}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-extrabold text-[11px] shadow-2xs text-center active:scale-95 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`mailto:${emailAddr}`}
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-extrabold text-[11px] shadow-2xs text-center active:scale-95 transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-slate-700" />
            <span>Email</span>
          </a>
        </div>

        {/* ================= MAIN CONTENT 2-COLUMN GRID ================= */}
        <div className="grid lg:grid-cols-12 gap-3.5 sm:gap-8 pt-1 sm:pt-2">

          {/* Left Column (8 cols): Stats, Overview, Offerings */}
          <div className="lg:col-span-8 space-y-3.5 sm:space-y-8">

            {/* Stats Summary Grid (2x2 on Mobile, 4 Cols on Desktop) */}
            <div className="bg-white rounded-xl sm:rounded-3xl border border-border p-3 sm:p-6 shadow-2xs grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center">
              <div className="p-2 sm:p-0 rounded-lg bg-slate-50/80 sm:bg-transparent border sm:border-0 border-slate-100">
                <p className="text-sm sm:text-xl font-extrabold text-[#D41367]">10+ Yrs</p>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground font-bold uppercase mt-0.5">ESTABLISHED</p>
              </div>
              <div className="p-2 sm:p-0 rounded-lg bg-slate-50/80 sm:bg-transparent border sm:border-0 border-slate-100 sm:border-l sm:border-border">
                <p className="text-sm sm:text-xl font-extrabold text-[#F7A81B]">50+</p>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground font-bold uppercase mt-0.5">DELIVERED</p>
              </div>
              <div className="p-2 sm:p-0 rounded-lg bg-slate-50/80 sm:bg-transparent border sm:border-0 border-slate-100 sm:border-l sm:border-border">
                <p className="text-sm sm:text-xl font-extrabold text-[#0050A2]">100%</p>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground font-bold uppercase mt-0.5">COMPLIANT</p>
              </div>
              <div className="p-2 sm:p-0 rounded-lg bg-slate-50/80 sm:bg-transparent border sm:border-0 border-slate-100 sm:border-l sm:border-border">
                <p className="text-sm sm:text-xl font-extrabold text-emerald-600">4.9 / 5</p>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground font-bold uppercase mt-0.5">RATING</p>
              </div>
            </div>

            {/* About the Business */}
            <div className="bg-white rounded-xl sm:rounded-3xl border border-border p-4 sm:p-8 shadow-2xs space-y-3 sm:space-y-4">
              <h2 className="text-sm sm:text-lg font-extrabold text-foreground flex items-center gap-2">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#D41367]" />
                <span>Executive Overview</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {business.description || "Leading provider of certified corporate services, engineering consultations, and specialized enterprise products within the Rotaract international trade network."}
              </p>

              <div className="pt-2.5 sm:pt-3 border-t border-border/60">
                <p className="text-[11px] sm:text-xs font-bold text-foreground mb-2">Specializations & Capabilities:</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-pink-50 text-[#D41367] text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl border border-pink-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Products & Solutions Showcase */}
            <div className="bg-white rounded-xl sm:rounded-3xl border border-border p-4 sm:p-8 shadow-2xs space-y-3.5 sm:space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-lg font-extrabold text-foreground flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#D41367]" />
                  <span>Solutions & Offerings</span>
                </h2>
                <span className="text-[10px] sm:text-xs font-bold text-[#D41367] bg-pink-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-pink-200/60">
                  {products.length > 0 ? products.length : 2} Listings
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                {/* Product Card 1 */}
                <div className="rounded-xl sm:rounded-2xl border border-border overflow-hidden bg-white shadow-2xs flex flex-col justify-between hover:border-pink-300 transition-all">
                  <div>
                    <div className="relative h-28 sm:h-40 w-full overflow-hidden bg-slate-900">
                      <Image
                        src="/images/product-tech.png"
                        alt="Cloud Transition Suite"
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-[#D41367] text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                        ENTERPRISE
                      </span>
                    </div>
                    <div className="p-3 sm:p-5 space-y-1 sm:space-y-1.5">
                      <h3 className="font-bold text-xs sm:text-sm text-foreground leading-tight">
                        Cloud Migration & Transition Suite
                      </h3>
                      <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        Complete end-to-end cloud infrastructure transition, security audit, and 24/7 monitoring.
                      </p>
                      <p className="text-xs sm:text-sm font-extrabold text-[#D41367] pt-0.5 sm:pt-1">From $4,999</p>
                    </div>
                  </div>
                  <div className="p-3 sm:p-5 pt-0">
                    <Button
                      className="w-full bg-[#D41367] hover:bg-[#B80E56] text-white rounded-lg sm:rounded-xl h-8 sm:h-9 text-[11px] sm:text-xs font-bold shadow-xs cursor-pointer"
                      asChild
                    >
                      <a href="#inquire">Request Quote</a>
                    </Button>
                  </div>
                </div>

                {/* Product Card 2 */}
                <div className="rounded-xl sm:rounded-2xl border border-border overflow-hidden bg-white shadow-2xs flex flex-col justify-between hover:border-pink-300 transition-all">
                  <div>
                    <div className="relative h-28 sm:h-40 w-full overflow-hidden bg-slate-900">
                      <Image
                        src="/images/hero-meeting.png"
                        alt="Cybersecurity Audit"
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-[#0050A2] text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                        AUDIT PRO
                      </span>
                    </div>
                    <div className="p-3 sm:p-5 space-y-1 sm:space-y-1.5">
                      <h3 className="font-bold text-xs sm:text-sm text-foreground leading-tight">
                        Cybersecurity & Compliance Audit
                      </h3>
                      <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        Comprehensive vulnerability assessment, compliance mapping, and executive security reports.
                      </p>
                      <p className="text-xs sm:text-sm font-extrabold text-[#D41367] pt-0.5 sm:pt-1">$1,250</p>
                    </div>
                  </div>
                  <div className="p-3 sm:p-5 pt-0">
                    <Button
                      className="w-full bg-[#D41367] hover:bg-[#B80E56] text-white rounded-lg sm:rounded-xl h-8 sm:h-9 text-[11px] sm:text-xs font-bold shadow-xs cursor-pointer"
                      asChild
                    >
                      <a href="#inquire">Request Quote</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Rotary Pass, Direct Channels, Inquiry Form */}
          <div className="lg:col-span-4 space-y-3.5 sm:space-y-6">

            {/* ROTARY IDENTITY Pass Card (Compact on Mobile) */}
            <div className="bg-[#D41367] rounded-xl sm:rounded-3xl p-4 sm:p-7 text-white shadow-md space-y-3 sm:space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <p className="text-[9px] sm:text-[10px] font-extrabold tracking-widest uppercase text-white/80">
                  ROTARY IDENTITY PASS
                </p>
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-200" />
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-extrabold text-sm sm:text-lg border border-white/30 text-white shrink-0">
                  {business.owner?.name ? business.owner.name.split(" ").map(w => w[0]).slice(0, 2).join("") : "RO"}
                </div>
                <div>
                  <p className="font-extrabold text-xs sm:text-base leading-tight">
                    {business.owner?.name || "Rtr. Sarah Perera"}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-white/85">Verified Enterprise Founder</p>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2 pt-2 sm:pt-3 text-[11px] sm:text-xs border-t border-white/20">
                <div className="flex items-center gap-1.5 sm:gap-2 text-white/90">
                  <Flag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
                  <span className="truncate">{business.rotaract_profile?.club_name || "Rotaract Club of Colombo Central"}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-white/90">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
                  <span>District 3220, Sri Lanka</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-white/90">
                  <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
                  <span>Rotary ID: <strong className="font-mono text-white">ROT-3220-8841</strong></span>
                </div>
              </div>
            </div>

            {/* Direct Contact Channels (Desktop Only to avoid duplicate buttons on mobile) */}
            <div className="hidden sm:block bg-white rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 shadow-2xs space-y-3">
              <h3 className="font-extrabold text-foreground text-xs sm:text-sm">Direct Contact Channels</h3>
              <div className="space-y-2">
                <a
                  href={`tel:${phoneNum}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-pink-50/60 hover:border-pink-200 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#D41367]" />
                    <span className="text-xs font-bold">Call Direct</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#D41367] transition-colors" />
                </a>

                <a
                  href={`https://wa.me/${waNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-emerald-50/60 hover:border-emerald-200 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold">WhatsApp Chat</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#D41367] transition-colors" />
                </a>

                <a
                  href={`mailto:${emailAddr}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-blue-50/60 hover:border-blue-200 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#0050A2]" />
                    <span className="text-xs font-bold">Email Desk</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#D41367] transition-colors" />
                </a>
              </div>
            </div>

            {/* Send Inquiry Form Card */}
            <div id="inquire" className="bg-white rounded-xl sm:rounded-3xl border border-border p-4 sm:p-6 shadow-2xs scroll-mt-20 sm:scroll-mt-24">
              <EnquiryForm businessName={business.name} />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

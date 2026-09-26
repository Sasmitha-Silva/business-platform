import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ChevronRight,
  ShoppingBag,
  Info,
  Flag,
  Award,
  ShieldCheck,
  Building2,
  ArrowLeft,
  Package,
  Clock,
  Globe,
  ExternalLink,
  Layers,
  CheckCircle2,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/verification-badge";
import { EnquiryForm } from "@/components/enquiry-form";
import { getBusinessBySlugAction } from "@/app/actions/directory";
import { formatCurrencyPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const biz = await getBusinessBySlugAction(slug);
  if (!biz) return { title: "Business Not Found" };
  return {
    title: `${biz.name} | Rotaract Business Network`,
    description: biz.description?.slice(0, 160),
  };
}

export default async function BusinessProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = await getBusinessBySlugAction(slug);
  if (!business || business.status !== "approved") notFound();

  const phoneNum = business.contact?.mobile;
  const waNum = business.contact?.whatsapp;
  const emailAddr = business.contact?.email;
  const tags = business.category?.name ? [business.category.name, "Verified Rotaract Enterprise", "Certified Quality"] : ["Enterprise"];
  const products = business.products_services || [];
  const districtNum = business.district_number || business.rotaract_profile?.district_number || 3220;
  const clubName = business.rotaract_profile?.club_name || "Rotaract Member Club";
  const rotaryId = business.rotaract_profile?.rotary_id || "Active Member";
  const ownerName = business.owner?.name || (business.owner as any)?.full_name || "Enterprise Founder";

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 space-y-4 sm:space-y-6">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
          <div className="flex items-center gap-1.5 overflow-hidden">
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
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-600 hover:text-[#D41367] bg-white hover:bg-pink-50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-slate-200 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">Directory</span>
          </Link>
        </div>

        {/* ================= HERO PROFILE SECTION ================= */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* 1. Cover Photo Banner (Compact, Sleek, Unobstructed) */}
          <div className="relative h-32 sm:h-44 md:h-52 w-full overflow-hidden bg-slate-900">
            {business.cover_image_url ? (
              <Image
                src={business.cover_image_url}
                alt={business.name}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-[#1e1b4b]" />
            )}

            {/* Floating Top Badges */}
            <div className="absolute top-2.5 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-2 z-10 pointer-events-none">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="bg-slate-950/75 backdrop-blur-md text-white border border-white/20 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-sm">
                  District {districtNum}
                </span>
                {business.category && (
                  <span className="bg-white/85 backdrop-blur-md text-slate-900 border border-white/40 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm">
                    {business.category.name}
                  </span>
                )}
              </div>
              <div className="shrink-0 drop-shadow-md">
                <VerificationBadge level={business.verification_level} size="sm" />
              </div>
            </div>
          </div>

          {/* 2. Main Profile Info Card (White, Clean, Overlapping Avatar, Crisp Typography) */}
          <div className="p-4 sm:p-6 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-5 -mt-8 sm:-mt-11 mb-3.5 pb-4 sm:pb-5 border-b border-slate-100">
              {/* Left: Avatar + Title Details */}
              <div className="flex items-end gap-3 sm:gap-4.5 min-w-0">
                {/* Overlapping Logo Avatar */}
                <div className="w-16 h-16 sm:w-22 sm:h-22 rounded-xl sm:rounded-2xl bg-white p-1 sm:p-1.5 shadow-md border-3 sm:border-4 border-white shrink-0 overflow-hidden relative z-10">
                  {business.logo_url ? (
                    <Image
                      src={business.logo_url}
                      alt={business.name}
                      fill
                      sizes="88px"
                      className="object-cover rounded-lg sm:rounded-xl"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#D41367] to-[#B80E56] rounded-lg sm:rounded-xl flex items-center justify-center text-white font-black text-xl sm:text-3xl shadow-inner">
                      {business.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1 min-w-0 pt-2 sm:pt-0">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    {business.name}
                  </h1>
                  {business.tagline && (
                    <p className="text-xs sm:text-sm text-slate-600 font-medium line-clamp-2 max-w-xl">
                      {business.tagline}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: Quick Action Buttons (Call, WhatsApp) */}
              <div className="flex items-center gap-2 shrink-0 sm:self-end">
                {phoneNum && (
                  <Button
                    size="sm"
                    className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs font-bold gap-1.5 h-9.5 px-4 shadow-xs cursor-pointer"
                    asChild
                  >
                    <a href={`tel:${phoneNum}`}>
                      <Phone className="w-3.5 h-3.5" />
                      <span>Contact</span>
                    </a>
                  </Button>
                )}
                {waNum && (
                  <a
                    href={`https://wa.me/${waNum}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 h-9.5 px-3.5 rounded-xl text-xs font-bold border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800 hover:border-emerald-300 transition-colors shadow-2xs cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            {/* Meta badges row (Location, Year Est., Website, and Enterprise Badges) */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs text-slate-600 font-medium">
                <span className="inline-flex items-center gap-1.5 text-slate-800 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#D41367]" />
                  <span>{business.location?.city || "National"}, {business.location?.country || "Sri Lanka"}</span>
                </span>

                {business.year_established && (
                  <span className="inline-flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Established {business.year_established}</span>
                  </span>
                )}

                {business.contact?.website && (
                  <a
                    href={business.contact.website.startsWith("http") ? business.contact.website : `https://${business.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#D41367] hover:underline font-semibold"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[200px]">{business.contact.website.replace(/^https?:\/\//, "")}</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}
              </div>

              {/* Quick Enterprise Accreditations Header Badges */}
              <div className="flex flex-wrap items-center gap-1.5">
                {business.is_women_owned && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-bold">
                    Women-Owned
                  </span>
                )}
                {business.is_startup && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-bold">
                    Startup
                  </span>
                )}
                {business.online_delivery && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-bold">
                    Delivery Ready
                  </span>
                )}
                {business.franchise_available && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-bold">
                    Franchise
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE QUICK ACTION CONTACT BAR ================= */}
        {(phoneNum || waNum || emailAddr) && (
          <div className="grid grid-cols-3 gap-2 sm:hidden">
            {phoneNum && (
              <a
                href={`tel:${phoneNum}`}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-pink-50 text-[#D41367] border border-pink-200/80 font-extrabold text-[11px] shadow-2xs text-center active:scale-95 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#D41367]" />
                <span>Call</span>
              </a>
            )}

            {waNum && (
              <a
                href={`https://wa.me/${waNum}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-extrabold text-[11px] shadow-2xs text-center hover:bg-emerald-100 hover:text-emerald-800 hover:border-emerald-300 active:scale-95 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            )}

            {emailAddr && (
              <a
                href={`mailto:${emailAddr}`}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-extrabold text-[11px] shadow-2xs text-center active:scale-95 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-slate-700" />
                <span>Email</span>
              </a>
            )}
          </div>
        )}

        {/* ================= MAIN CONTENT 2-COLUMN GRID ================= */}
        <div className="grid lg:grid-cols-12 gap-3.5 sm:gap-8 pt-1 sm:pt-2">

          {/* Left Column (8 cols): Overview & Offerings */}
          <div className="lg:col-span-8 space-y-3.5 sm:space-y-8">

            {/* About the Business */}
            <div className="bg-white rounded-xl sm:rounded-3xl border border-border p-4 sm:p-8 shadow-2xs space-y-3 sm:space-y-4">
              <h2 className="text-sm sm:text-lg font-extrabold text-foreground flex items-center gap-2">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#D41367]" />
                <span>Executive Overview</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {business.description || "Leading provider of certified corporate services and specialized enterprise products within the Rotaract international trade network."}
              </p>

              {business.location?.address && (
                <div className="pt-2 text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D41367] shrink-0" />
                  <span>{business.location.address}</span>
                </div>
              )}

              {/* Business Overview & Capabilities */}
              <div className="pt-3 border-t border-border/60 space-y-2">
                <p className="text-[11px] sm:text-xs font-bold text-foreground">Industry Sector &amp; Capabilities:</p>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {business.category && (
                    <span className="px-2.5 sm:px-3 py-1 bg-pink-50 text-[#D41367] text-[11px] sm:text-xs font-bold rounded-xl border border-pink-200/60">
                      {business.category.name}
                    </span>
                  )}
                  {business.business_type?.map((type) => {
                    const formatted = String(type).replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                    return (
                      <span
                        key={type}
                        className="px-2.5 sm:px-3 py-1 bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-bold rounded-xl border border-slate-200/80"
                      >
                        {formatted}
                      </span>
                    );
                  })}
                  {business.is_women_owned && (
                    <span className="px-2.5 sm:px-3 py-1 bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-bold rounded-xl border border-slate-200/80">
                      Women-Owned
                    </span>
                  )}
                  {business.is_startup && (
                    <span className="px-2.5 sm:px-3 py-1 bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-bold rounded-xl border border-slate-200/80">
                      Startup
                    </span>
                  )}
                  {business.online_delivery && (
                    <span className="px-2.5 sm:px-3 py-1 bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-bold rounded-xl border border-slate-200/80">
                      Online Delivery
                    </span>
                  )}
                  {business.franchise_available && (
                    <span className="px-2.5 sm:px-3 py-1 bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-bold rounded-xl border border-slate-200/80">
                      Franchise Available
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Products & Solutions Showcase */}
            <div className="bg-white rounded-xl sm:rounded-3xl border border-border p-4 sm:p-8 shadow-2xs space-y-3.5 sm:space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-lg font-extrabold text-foreground flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#D41367]" />
                  <span>Solutions &amp; Offerings</span>
                </h2>
                {products.length > 0 && (
                  <span className="text-[10px] sm:text-xs font-bold text-[#D41367] bg-pink-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-pink-200/60">
                    {products.length} {products.length === 1 ? "Listing" : "Listings"}
                  </span>
                )}
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {products.map((item) => {
                    const isService = item.type === "service";
                    const scopeLabel = item.service_area ? item.service_area.charAt(0).toUpperCase() + item.service_area.slice(1) : null;
                    const formattedPrice = formatCurrencyPrice(item.price_from, business.location?.country);

                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-[#D41367]/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group space-y-4"
                      >
                        <div className="space-y-3">
                          {/* Top Header Row: Type Badge + Starting Price */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-2xs">
                              {isService ? (
                                <Wrench className="w-3.5 h-3.5 text-pink-400" />
                              ) : (
                                <Package className="w-3.5 h-3.5 text-pink-400" />
                              )}
                              <span>{isService ? "Service" : "Product"}</span>
                            </div>

                            {formattedPrice ? (
                              <div className="text-right">
                                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider leading-none">
                                  Starting from
                                </span>
                                <span className="text-sm sm:text-base font-black text-[#D41367] tracking-tight">
                                  {formattedPrice}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[11px] font-bold text-slate-500 bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200/60 shadow-2xs">
                                Custom Quote
                              </span>
                            )}
                          </div>

                          {/* Title & Description */}
                          <div className="space-y-1.5 pt-1">
                            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug group-hover:text-[#D41367] transition-colors">
                              {item.name}
                            </h3>
                            {item.description && (
                              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Bottom Footer Split: Scope Pill (Left) & Action Button (Right) */}
                        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2.5">
                          {scopeLabel ? (
                            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80">
                              <Globe className="w-3.5 h-3.5 text-[#D41367]" />
                              <span>{scopeLabel}</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                              <span>Verified Listing</span>
                            </div>
                          )}

                          <Button
                            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-8.5 sm:h-9 px-3.5 text-xs font-bold shadow-2xs cursor-pointer group-hover:shadow-xs transition-all inline-flex items-center gap-1"
                            asChild
                          >
                            <a href="#inquire">
                              <span>Request Quote</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
                  <Building2 className="w-7 h-7 text-[#D41367] mx-auto opacity-70" />
                  <p className="text-xs font-semibold text-slate-700">
                    Direct Inquiries &amp; Custom Consultations
                  </p>
                  <p className="text-[11px] text-muted-foreground max-w-sm mx-auto">
                    This enterprise provides tailored commercial services. Use the enquiry desk below to request a direct proposal.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column (4 cols): Rotary Pass, Direct Channels, Inquiry Form */}
          <div className="lg:col-span-4 space-y-3.5 sm:space-y-6">

            {/* ROTARY IDENTITY Pass Card */}
            <div className="bg-gradient-to-br from-[#D41367] via-[#B80E56] to-[#800A3C] rounded-xl sm:rounded-3xl p-4 sm:p-7 text-white shadow-md space-y-3 sm:space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <p className="text-[9px] sm:text-[10px] font-extrabold tracking-widest uppercase text-white/80">
                  ROTARY IDENTITY PASS
                </p>
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-200" />
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-extrabold text-sm sm:text-lg border border-white/30 text-white shrink-0">
                  {ownerName.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase()}
                </div>
                <div>
                  <p className="font-extrabold text-xs sm:text-base leading-tight">
                    {ownerName}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-white/85">Verified Enterprise Founder</p>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2 pt-2 sm:pt-3 text-[11px] sm:text-xs border-t border-white/20">
                <div className="flex items-center gap-1.5 sm:gap-2 text-white/90">
                  <Flag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
                  <span className="truncate">{clubName}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-white/90">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
                  <span>District {districtNum}, {business.location?.country || "Sri Lanka"}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-white/90">
                  <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
                  <span>Rotary ID: <strong className="font-mono text-white">{rotaryId}</strong></span>
                </div>
              </div>
            </div>

            {/* Direct Contact Channels (Desktop Only) */}
            {(phoneNum || waNum || emailAddr) && (
              <div className="hidden sm:block bg-white rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 shadow-2xs space-y-3">
                <h3 className="font-extrabold text-foreground text-xs sm:text-sm">Direct Contact Channels</h3>
                <div className="space-y-2">
                  {phoneNum && (
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
                  )}

                  {waNum && (
                    <a
                      href={`https://wa.me/${waNum}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-emerald-50/80 hover:border-emerald-300 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:scale-105 transition-transform" />
                        <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800">WhatsApp Chat</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
                    </a>
                  )}

                  {emailAddr && (
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
                  )}
                </div>
              </div>
            )}

            {/* Send Inquiry Form Card */}
            <div id="inquire" className="bg-white rounded-xl sm:rounded-3xl border border-border p-4 sm:p-6 shadow-2xs scroll-mt-20 sm:scroll-mt-24">
              <EnquiryForm businessId={business.id} businessName={business.name} />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

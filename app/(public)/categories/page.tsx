import Link from "next/link";
import { Laptop, Briefcase, Palette, Factory, Stethoscope, ShoppingBag, GraduationCap, Utensils, Layers, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockCategories } from "@/lib/mock-data";

const iconMap: Record<string, any> = {
  "technology-software": Laptop,
  "professional-services": Briefcase,
  "creative-media": Palette,
  "manufacturing": Factory,
  "healthcare": Stethoscope,
  "retail-ecommerce": ShoppingBag,
  "education": GraduationCap,
  "hospitality": Utensils,
};

const categoryThemes: Record<string, { bgGradient: string; text: string; iconBg: string; border: string }> = {
  "technology-software": {
    bgGradient: "from-pink-500/10 via-[#D41367]/5 to-transparent",
    text: "text-[#D41367]",
    iconBg: "bg-[#D41367] text-white shadow-pink-500/20",
    border: "border-pink-200/80 hover:border-[#D41367]",
  },
  "professional-services": {
    bgGradient: "from-amber-500/10 via-[#F7A81B]/5 to-transparent",
    text: "text-amber-700",
    iconBg: "bg-[#F7A81B] text-slate-950 shadow-amber-500/20",
    border: "border-amber-200/80 hover:border-[#F7A81B]",
  },
  "creative-media": {
    bgGradient: "from-purple-500/10 via-purple-600/5 to-transparent",
    text: "text-purple-700",
    iconBg: "bg-purple-600 text-white shadow-purple-500/20",
    border: "border-purple-200/80 hover:border-purple-500",
  },
  "manufacturing": {
    bgGradient: "from-emerald-500/10 via-emerald-600/5 to-transparent",
    text: "text-emerald-700",
    iconBg: "bg-emerald-600 text-white shadow-emerald-500/20",
    border: "border-emerald-200/80 hover:border-emerald-500",
  },
  "healthcare": {
    bgGradient: "from-blue-500/10 via-[#0050A2]/5 to-transparent",
    text: "text-[#0050A2]",
    iconBg: "bg-[#0050A2] text-white shadow-blue-500/20",
    border: "border-blue-200/80 hover:border-[#0050A2]",
  },
  "retail-ecommerce": {
    bgGradient: "from-rose-500/10 via-rose-600/5 to-transparent",
    text: "text-rose-700",
    iconBg: "bg-rose-600 text-white shadow-rose-500/20",
    border: "border-rose-200/80 hover:border-rose-500",
  },
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F4] pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Dynamic Category Hero Header Card */}
        <div className="bg-gradient-to-r from-pink-50 via-warm-bg to-[#FFF0F4] border border-pink-200/80 rounded-[2.5rem] p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D41367]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white text-[#D41367] text-xs font-bold rounded-full border border-pink-200 shadow-sm">
              <Layers className="w-3.5 h-3.5" /> 12 Major Sectors · 85 Subcategories
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
              Explore Business <span className="text-[#D41367]">Categories</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Browse verified Rotaract enterprises categorized by industry sector, specialized sub-domains, and professional credentials.
            </p>
          </div>

          {/* Quick Sector Stats Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-pink-200/60 relative z-10">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-pink-100 shadow-sm">
              <p className="text-2xl font-extrabold text-[#D41367]">340+</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">TECH & SOFTWARE</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-pink-100 shadow-sm">
              <p className="text-2xl font-extrabold text-amber-600">280+</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">PROFESSIONAL SERVICES</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-pink-100 shadow-sm">
              <p className="text-2xl font-extrabold text-purple-600">190+</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">CREATIVE & MEDIA</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-pink-100 shadow-sm">
              <p className="text-2xl font-extrabold text-emerald-600">150+</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">MANUFACTURING</p>
            </div>
          </div>
        </div>

        {/* Vibrant Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCategories.map((cat) => {
            const IconComponent = iconMap[cat.slug] || Laptop;
            const theme = categoryThemes[cat.slug] || categoryThemes["technology-software"];

            return (
              <div
                key={cat.id}
                className={`bg-white rounded-[2.5rem] border ${theme.border} p-8 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden`}
              >
                {/* Ambient Card Background Glow */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${theme.bgGradient} rounded-full blur-2xl pointer-events-none`} />

                <div>
                  {/* Top Row: Icon + Count Badge */}
                  <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-extrabold bg-warm-bg text-foreground/80 px-3 py-1 rounded-full border border-border">
                      {cat.children?.length || 4} Subcategories
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 mb-6 relative z-10">
                    <h2 className="text-xl font-extrabold text-foreground group-hover:text-[#D41367] transition-colors">
                      {cat.name}
                    </h2>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      Leading verified entities offering specialized services and products.
                    </p>
                  </div>

                  {/* Subcategories Micro-Pills */}
                  <div className="space-y-2 mb-6 relative z-10">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Key Specializations:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.children?.map((sub) => (
                        <span
                          key={sub.id}
                          className="px-3 py-1 bg-warm-bg text-foreground/80 text-[11px] font-semibold rounded-xl border border-border"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="pt-4 border-t border-border/60 relative z-10">
                  <Button
                    className="w-full bg-warm-bg hover:bg-[#D41367] text-foreground hover:text-white text-xs font-bold rounded-xl h-11 border border-border hover:border-[#D41367] transition-all justify-between px-5"
                    asChild
                  >
                    <Link href={`/categories/${cat.slug}`}>
                      <span>Explore Category</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

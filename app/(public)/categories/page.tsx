import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Factory,
  ShoppingBag,
  Briefcase,
  Cpu,
  Heart,
  GraduationCap,
  UtensilsCrossed,
  Building,
  Palette,
  MoreHorizontal,
  Layers,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { mockCategories } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse verified Rotaract enterprises categorized by commercial industry and sector.",
};

const iconMap: Record<string, React.ElementType> = {
  manufacturing: Factory,
  retail: ShoppingBag,
  "professional-services": Briefcase,
  technology: Cpu,
  healthcare: Heart,
  education: GraduationCap,
  hospitality: UtensilsCrossed,
  "real-estate-construction": Building,
  "creative-services": Palette,
  others: MoreHorizontal,
};

const categoryImages: Record<string, string> = {
  "professional-services": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  technology: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  healthcare: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
  "creative-services": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  "real-estate-construction": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  manufacturing: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  retail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
  education: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  hospitality: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  others: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white text-foreground pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Compact Header */}
        <div className="space-y-4 pb-6 border-b border-border/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
            <Link href="/" className="hover:text-[#D41367] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#D41367] font-bold">Categories</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
              Industry <span className="text-[#D41367]">Categories & Sectors</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
              Browse verified Rotaract enterprises categorized by sector
            </p>
          </div>
        </div>

        {/* Categories Photo Cards Grid (Centered for 1, 2, or 3 items) */}
        <div className="flex flex-wrap justify-center gap-5">
          {mockCategories.map((cat) => {
            const IconComponent = iconMap[cat.slug] || Layers;
            const subcategoryCount = cat.children?.length || 0;
            const bgImage = categoryImages[cat.slug] || categoryImages["others"];

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group relative rounded-3xl overflow-hidden min-h-[220px] shadow-md hover:shadow-xl transition-all duration-300 border border-pink-100/60 block w-full sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)]"
              >
                <Image
                  src={bgImage}
                  alt={cat.name}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 p-6 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-sm">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/30">
                      {cat.business_count || "100+"} Enterprises
                    </span>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black tracking-tight text-white mb-0.5 group-hover:text-pink-200 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-white/80 font-medium">
                        {subcategoryCount} Specializations · Verified Directory
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:bg-[#D41367] group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

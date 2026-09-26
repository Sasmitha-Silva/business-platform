import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { getCategoriesAction } from "@/app/actions/directory";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse verified Rotaract enterprises categorized by commercial industry and sector.",
};

const categoryPhotos: Record<string, string> = {
  technology: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=85",
  "professional-services": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  healthcare: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",
  "creative-services": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
  manufacturing: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85",
  retail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85",
  education: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
  hospitality: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
  "real-estate-construction": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  "finance-audit": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85",
  others: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
};

const defaultPhoto = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85";

export default async function CategoriesPage() {
  const categories = await getCategoriesAction();

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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
                Industry <span className="text-[#D41367]">Categories &amp; Sectors</span>
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
                Browse verified Rotaract enterprises categorized by official commercial industry
              </p>
            </div>
            <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto border border-slate-200">
              {categories.length} Active Industry Sectors
            </div>
          </div>
        </div>

        {/* Dynamic Database Categories Grid with Background Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const photo = categoryPhotos[cat.slug] || defaultPhoto;
            const subcategoryCount = cat.children?.length || 0;
            const count = cat.business_count || 0;

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group relative rounded-3xl overflow-hidden min-h-[220px] shadow-md hover:shadow-xl transition-all duration-300 border border-border/80 block bg-slate-900"
              >
                {/* Background Photo */}
                <Image
                  src={photo}
                  alt={cat.name}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25 p-6 flex flex-col justify-between text-white" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between p-6 pb-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/30">
                    {count} {count === 1 ? "Verified Business" : "Verified Businesses"}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 p-6 pt-10 flex items-end justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black tracking-tight text-white leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/80 font-medium">
                      {cat.children && cat.children.length > 0
                        ? cat.children.slice(0, 3).map((c) => c.name).join(" · ")
                        : `${subcategoryCount} Specializations`}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-black" />
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

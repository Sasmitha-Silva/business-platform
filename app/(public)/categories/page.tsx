import Link from "next/link";
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

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F4] text-foreground pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Compact Header (No Hero) */}
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
              Industry <span className="text-[#D41367]">Categories</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
              Browse verified Rotaract enterprises categorized by sector
            </p>
          </div>
        </div>

        {/* Categories Compact Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
          {mockCategories.map((cat) => {
            const IconComponent = iconMap[cat.slug] || Layers;
            const subcategoryCount = cat.children?.length || 0;

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group bg-card rounded-2xl border border-border hover:border-[#D41367]/40 p-5 transition-all duration-200 hover:shadow-md hover:shadow-[#D41367]/5 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#D41367] text-white flex items-center justify-center shadow-sm shadow-[#D41367]/20 mb-3.5 transition-transform duration-200 group-hover:scale-105">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-[#D41367] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] font-medium text-muted-foreground">
                    {subcategoryCount} specialization{subcategoryCount !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-[#D41367] font-semibold">
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

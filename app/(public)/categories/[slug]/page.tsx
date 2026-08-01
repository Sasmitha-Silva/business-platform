import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "@/components/business-card";
import { mockCategories, mockBusinesses } from "@/lib/mock-data";

export async function generateStaticParams() {
  return mockCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = mockCategories.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} — Rotaract Business Network`,
    description: `Discover verified ${category.name.toLowerCase()} businesses in the Rotaract network.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = mockCategories.find((c) => c.slug === slug);
  if (!category) notFound();

  const businesses = mockBusinesses.filter(
    (b) => b.category_id === category.id && b.status === "approved"
  );

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header (No Hero) */}
        <div className="pt-4 pb-6 border-b border-border mb-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Link href="/" className="hover:text-[#D41367] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/categories" className="hover:text-[#D41367] transition-colors">Categories</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{category.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {businesses.length} verified business{businesses.length !== 1 ? "es" : ""} · {category.children?.length || 0} specializations
              </p>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D41367] hover:bg-[#B80E56] text-white text-xs font-bold rounded-full transition-colors shadow-sm shrink-0 self-start sm:self-auto"
            >
              Register Your Business
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Subcategories Sidebar */}
          {category.children && category.children.length > 0 && (
            <div className="lg:w-56 shrink-0">
              <div className="bg-card rounded-2xl border border-border p-4 sticky top-24">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  Specializations
                </h3>
                <div className="space-y-1">
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-[#D41367] text-white transition-colors">
                    <span>All Businesses</span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{businesses.length}</span>
                  </button>
                  {category.children.map((sub) => (
                    <button
                      key={sub.id}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-muted-foreground hover:bg-[#FEE8F0] hover:text-[#D41367] transition-colors"
                    >
                      <span className="truncate">{sub.name}</span>
                      <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Business Grid */}
          <div className="flex-1 min-w-0">
            {businesses.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-5">
                {businesses.map((biz) => (
                  <BusinessCard key={biz.id} business={biz} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-2xl border border-border p-8">
                <Building2 className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <h3 className="text-base font-bold text-foreground mb-1">No businesses listed yet</h3>
                <p className="text-xs text-muted-foreground mb-4 max-w-sm mx-auto">
                  Be the first verified Rotaract entrepreneur to list your enterprise under {category.name}.
                </p>
                <Button className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full text-xs font-bold px-6" asChild>
                  <Link href="/register">Register Business</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Building2, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/verification-badge";
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

  const stats = [
    { value: `${businesses.length * 18}+`, label: "Verified Producers" },
    { value: `${Math.floor(businesses.length * 3.5)}`, label: "Global Markets" },
    { value: "98%", label: "Trust Score" },
    { value: `$${(businesses.length * 0.3).toFixed(1)}M`, label: "B2B Trade Volume" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-warm-bg to-card border-b border-border py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-crimson/10 text-crimson text-xs font-semibold rounded-full mb-4">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Network
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Discover Verified {category.name} in Rotaract
              </h1>
              <p className="text-muted-foreground mt-3 max-w-lg">
                Connect with reliable {category.name.toLowerCase()} partners vetted by the Rotaract Business Network. Find quality-assured excellence within our global community.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <Button className="bg-crimson hover:bg-crimson-dark text-white rounded-full gap-2" asChild>
                  <Link href="/directory">Browse All Members <ArrowRight className="w-4 h-4" /></Link>
                </Button>
                <Button variant="outline" className="rounded-full border-crimson text-crimson hover:bg-crimson/5" asChild>
                  <Link href="/auth/signup">Register Your Business</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="w-80 h-52 rounded-3xl bg-gradient-to-br from-crimson/10 to-warm-pink flex items-center justify-center shadow-lg">
                <Building2 className="w-20 h-20 text-crimson/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-crimson">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Sub-categories sidebar */}
          <div className="hidden lg:block w-56 shrink-0">
            <div className="bg-card rounded-2xl border border-border p-5 sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">Sub-Categories</h3>
              <div className="space-y-1">
                {category.children?.map((sub, i) => (
                  <button
                    key={sub.id}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      i === 0
                        ? "bg-crimson text-white font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-crimson"
                    }`}
                  >
                    <span className="truncate">{sub.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Business Grid */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Top {category.name} Businesses
            </h2>
            {businesses.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-5">
                {businesses.map((biz) => (
                  <BusinessCard key={biz.id} business={biz} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-2xl border border-border">
                <Building2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No businesses listed in this category yet.</p>
                <Button className="bg-crimson hover:bg-crimson-dark text-white rounded-full mt-4" asChild>
                  <Link href="/auth/signup">Be the First to Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

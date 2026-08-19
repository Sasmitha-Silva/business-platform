import { notFound } from "next/navigation";
import { CategoryDetailView } from "@/components/category-detail-view";
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
    description: `Discover verified ${category.name.toLowerCase()} enterprises and certified Rotaract professionals.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = mockCategories.find((c) => c.slug === slug);
  if (!category) notFound();

  const businesses = mockBusinesses.filter(
    (b) =>
      (b.category_id === category.id || b.category?.slug === category.slug) &&
      b.status === "approved"
  );

  return (
    <CategoryDetailView
      category={category}
      businesses={businesses}
      allCategories={mockCategories}
    />
  );
}


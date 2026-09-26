import { notFound } from "next/navigation";
import { CategoryDetailView } from "@/components/category-detail-view";
import { getCategoriesAction, getBusinessesAction } from "@/app/actions/directory";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allCategories = await getCategoriesAction();
  const category = allCategories.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} | Rotaract Business Network`,
    description: `Discover verified ${category.name.toLowerCase()} enterprises and certified Rotaract professionals.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allCategories = await getCategoriesAction();
  const category = allCategories.find((c) => c.slug === slug);
  if (!category) notFound();

  const res = await getBusinessesAction({ category_id: category.id, per_page: 50 });
  const businesses = res.data || [];

  return (
    <CategoryDetailView
      category={category}
      businesses={businesses}
      allCategories={allCategories}
    />
  );
}


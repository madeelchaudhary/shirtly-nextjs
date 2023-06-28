import Categories from "@/components/Category/Categories";
import FeaturedProducts from "@/components/Featured/Products";
import HomeHeroSection from "@/components/Hero/homeSection";
import { fetchCategories, fetchDiscountedProducts } from "@/lib/data";

export const revalidate = 600;

export default async function Home() {
  const categories = await fetchCategories();
  const discountedProds = await fetchDiscountedProducts();

  return (
    <>
      <HomeHeroSection />
      <FeaturedProducts items={discountedProds} />
      <Categories items={categories} />
    </>
  );
}

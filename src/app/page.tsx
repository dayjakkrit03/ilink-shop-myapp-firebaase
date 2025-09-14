import { fetchCategories, fetchStores, fetchFeaturedProducts, fetchHeroBanners, fetchPromotions, fetchClearanceSaleProducts } from "@/lib/data";
import HomeClient from "./home-client";

export const revalidate = 10; // Re-add revalidation

export default async function Page() {
  // Fetch all necessary data in parallel
  const [categories, stores, featuredProducts, heroBanners, promotions, clearanceSaleProducts] = await Promise.all([
    fetchCategories(),
    fetchStores(),
    fetchFeaturedProducts(),
    fetchHeroBanners(),
    fetchPromotions(),
    fetchClearanceSaleProducts(),
  ]);

  return <HomeClient 
    categories={categories} 
    stores={stores} 
    featuredProducts={featuredProducts} 
    heroBanners={heroBanners} 
    promotions={promotions} 
    clearanceSaleProducts={clearanceSaleProducts} 
  />;
}

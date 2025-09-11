import { fetchCategories, fetchStores, fetchFeaturedProducts, fetchHeroBanners, fetchPromotions } from "@/lib/data";
import HomeClient from "./home-client";

export default async function Page() {
  // Fetch all necessary data in parallel
  const [categories, stores, featuredProducts, heroBanners, promotions] = await Promise.all([
    fetchCategories(),
    fetchStores(),
    fetchFeaturedProducts(),
    fetchHeroBanners(),
    fetchPromotions(),
  ]);

  return <HomeClient 
    categories={categories} 
    stores={stores} 
    featuredProducts={featuredProducts} 
    heroBanners={heroBanners} 
    promotions={promotions} 
  />;
}
import { fetchCategories, fetchStores, fetchFeaturedProducts } from "@/lib/data";
import HomeClient from "./home-client";

export default async function Page() {
  // Fetch data on the server before rendering the page
  const categories = await fetchCategories();
  const stores = await fetchStores();
  const featuredProducts = await fetchFeaturedProducts();

  return <HomeClient categories={categories} stores={stores} featuredProducts={featuredProducts} />;
}
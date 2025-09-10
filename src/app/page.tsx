import { fetchCategories, fetchStores } from "@/lib/data";
import HomeClient from "./home-client";

export default async function Page() {
  // Fetch data on the server before rendering the page
  const categories = await fetchCategories();
  const stores = await fetchStores();

  return <HomeClient categories={categories} stores={stores} />;
}
import { fetchCategories } from "@/lib/data";
import HomeClient from "./home-client";

export default async function Page() {
  // Fetch data on the server before rendering the page
  const categories = await fetchCategories();

  return <HomeClient categories={categories} />;
}
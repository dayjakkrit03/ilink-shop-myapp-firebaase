'use client';

import { HeroSection } from "@/components/hero-section";
import { CategoryGrid } from "@/components/category-grid";
import { FlashSale } from "@/components/flash-sale";
import { InterlinkMall } from "@/components/interlink-mall";
import { ProductGrid } from "@/components/product-grid";

// Import the data-fetching functions to infer their return types
import type { fetchCategories, fetchStores, fetchFeaturedProducts, fetchHeroBanners, fetchPromotions, fetchClearanceSaleProducts } from "@/lib/data";

// Infer types directly from the data-fetching functions
type Category = Awaited<ReturnType<typeof fetchCategories>>[number];
type Store = Awaited<ReturnType<typeof fetchStores>>[number];
type FeaturedProduct = Awaited<ReturnType<typeof fetchFeaturedProducts>>[number];
type ClearanceSaleProduct = Awaited<ReturnType<typeof fetchClearanceSaleProducts>>[number];
type HeroBanner = Awaited<ReturnType<typeof fetchHeroBanners>>[number];
type Promotion = Awaited<ReturnType<typeof fetchPromotions>>[number];

interface HomeClientProps {
  categories: Category[];
  stores: Store[];
  featuredProducts: FeaturedProduct[];
  clearanceSaleProducts: ClearanceSaleProduct[];
  heroBanners: HeroBanner[];
  promotions: Promotion[];
}

export default function HomeClient({
  categories,
  stores,
  featuredProducts,
  clearanceSaleProducts,
  heroBanners,
  promotions,
}: HomeClientProps) {

  return (
    // The main container div is no longer needed as layout.tsx provides it
    <>
        <HeroSection banners={heroBanners} promotions={promotions} />
        <ProductGrid title="สินค้าแนะนำ" products={featuredProducts} />
        <CategoryGrid items={categories} />
        <FlashSale products={clearanceSaleProducts} />
        <InterlinkMall stores={stores} />
    </>
  );
}

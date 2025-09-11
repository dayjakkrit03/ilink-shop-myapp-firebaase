"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { CategoryGrid } from "@/components/category-grid";
import { FlashSale } from "@/components/flash-sale";
import { InterlinkMall } from "@/components/interlink-mall";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";
import { ShoppingCart } from "@/components/shopping-cart";
import { MessageChat } from "@/components/message-chat";

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
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Mock cart items count - in real app this would come from state management
  const cartItemCount = 4;

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
      <main>
        <HeroSection banners={heroBanners} promotions={promotions} />
        <ProductGrid products={featuredProducts} onAddToCart={() => setIsCartOpen(true)} />
        <CategoryGrid items={categories} />
        <FlashSale products={clearanceSaleProducts} />
        <InterlinkMall stores={stores} />
      </main>
      <Footer />
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MessageChat />
    </div>
  );
}

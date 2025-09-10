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
import { Category, Store } from "@/lib/definitions";

interface HomeClientProps {
  categories: Category[];
  stores: Store[];
}

export default function HomeClient({ categories, stores }: HomeClientProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Mock cart items count - in real app this would come from state management
  const cartItemCount = 4;

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
      <main>
        <HeroSection />
        <ProductGrid onAddToCart={() => setIsCartOpen(true)} />
        <CategoryGrid items={categories} />
        <FlashSale />
        <InterlinkMall stores={stores} />
      </main>
      <Footer />
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MessageChat />
    </div>
  );
}
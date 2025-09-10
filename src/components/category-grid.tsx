"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Category } from "@/lib/definitions";

interface CategoryGridProps {
  items?: Category[];
}

export const CategoryGrid = ({ items = [] }: CategoryGridProps) => {
  const router = useRouter();

  const handleCategoryClick = (category: { slug?: string; name: string }) => {
    router.push(`/products?category=${encodeURIComponent(category.slug ?? category.name)}`);
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            หมวดหมู่สินค้า
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            เลือกซื้ออุปกรณ์เครือข่ายคุณภาพสูงจากหมวดหมู่ที่หลากหลาย
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {items.map((category, index) => (
            <div
              key={category.slug ?? index}
              onClick={() => handleCategoryClick(category)}
              className="flex flex-col items-center p-6 rounded-xl bg-card hover:bg-gradient-card shadow-soft hover:shadow-card-hover transition-all duration-300 cursor-pointer group opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Image
                  src={category.image_url ?? "/placeholder.png"}
                  alt={category.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-2xl shadow-soft"
                />
              </div>
              <span className="text-sm font-medium text-center group-hover:text-primary transition-colors leading-tight h-10">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
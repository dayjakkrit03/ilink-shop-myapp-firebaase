import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { FeaturedProduct } from "@/lib/definitions";

interface ProductGridProps {
  products: FeaturedProduct[];
  onAddToCart?: () => void;
}

export const ProductGrid = ({ products = [], onAddToCart }: ProductGridProps) => {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">สินค้าแนะนำ</h2>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            ดูทั้งหมด
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {products.map((product) => {
            const discount = product.original_price && product.price
              ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
              : undefined;

            return (
              <ProductCard 
                key={product.id} 
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                originalPrice={product.original_price ?? undefined}
                discount={discount}
                rating={product.avg_rating ?? 0}
                reviews={product.reviews_count ?? 0}
                image={product.image_url ?? "/placeholder.png"}
                isFreeShipping={product.is_free_shipping ?? false}
                onAddToCart={onAddToCart} 
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
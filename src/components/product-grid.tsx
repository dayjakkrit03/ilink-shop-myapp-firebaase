import { ProductCard, type ProductCardProps } from "./product-card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// The data now comes from the server component, already mapped.
// We can use the ProductCardProps to define the shape of our product.
// This ensures that ProductGrid and ProductCard are always in sync.
type Product = Omit<ProductCardProps, 'onAddToCart'>;

interface ProductGridProps {
  products: Product[];
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
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} // Pass all product props directly
              onAddToCart={onAddToCart}
              variant="default" // Explicitly set the variant
            />
          ))}
        </div>
      </div>
    </section>
  );
};
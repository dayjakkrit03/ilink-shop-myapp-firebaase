import { ProductCard, type Product } from "@/components/product-card";

const mockProducts: Product[] = [
  { id: 1, name: "LAN Cable CAT6", price: "1,500.00", image: "/assets/lan-cable-cat6.jpg", tag: "New" },
  { id: 2, name: "Fiber Optic Cable", price: "3,200.00", image: "/assets/fiber-optic-cable.jpg" },
  { id: 3, name: "Network Switch 24-Port", price: "4,800.00", image: "/assets/switch-24port.jpg", tag: "Sale" },
  { id: 4, name: "Server Rack 19-inch", price: "8,500.00", image: "/assets/server-rack-19inch.jpg" },
];

interface ProductGridProps {
  onAddToCart: () => void;
}

export const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  return (
    <section className="container py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
};
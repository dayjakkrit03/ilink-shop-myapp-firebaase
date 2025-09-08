import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockProducts = [
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
          <Card key={product.id} className="overflow-hidden transition-all hover:shadow-card-hover">
            <CardHeader className="p-0 relative">
              <Image src={product.image} alt={product.name} width={400} height={400} className="aspect-square object-cover" />
              {product.tag && (
                <Badge className="absolute top-2 right-2" variant={product.tag === "Sale" ? "destructive" : "default"}>
                  {product.tag}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-base font-medium h-12">{product.name}</CardTitle>
              <p className="text-lg font-semibold text-primary mt-2">฿{product.price}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" onClick={onAddToCart}>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
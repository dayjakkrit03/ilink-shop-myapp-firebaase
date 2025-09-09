import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  tag?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-card-hover">
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
  );
};
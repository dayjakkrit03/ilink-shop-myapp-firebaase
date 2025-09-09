"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  image: string;
  isLiked?: boolean;
  isFreeShipping?: boolean;
  onAddToCart?: () => void;
}

export const ProductCard = ({
  name,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
  image,
  isLiked: initialIsLiked = false,
  isFreeShipping,
  onAddToCart,
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount).replace('฿', '฿');
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-card-hover h-full flex flex-col bg-card">
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="aspect-square object-cover"
        />
        {discount && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            -{discount}%
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            className={cn(
              "h-4 w-4 text-muted-foreground",
              isLiked && "fill-red-500 text-red-500"
            )}
          />
        </Button>
      </div>
      <CardContent className="p-3 flex-grow flex flex-col">
        <h3 className="text-sm font-medium h-10 line-clamp-2 mb-2">{name}</h3>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-primary">
              {formatCurrency(price)}
            </p>
            {originalPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {formatCurrency(originalPrice)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{rating}</span>
              </div>
            )}
            {reviews && <span>({reviews} รีวิว)</span>}
          </div>
          {isFreeShipping && (
            <div className="flex items-center gap-1 text-xs text-success mt-2">
              <Truck className="h-3 w-3" />
              <span>ส่งฟรี</span>
            </div>
          )}
        </div>
      </CardContent>
      <div className="p-3 pt-0">
        <Button className="w-full" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};
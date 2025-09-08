"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onCartClick: () => void;
  cartItemCount: number;
}

export const Header = ({ onCartClick, cartItemCount }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-header">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/assets/interlink-logo.png" alt="Interlink Logo" width={120} height={40} />
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link href="/products" className="text-foreground/60 transition-colors hover:text-foreground">
              Products
            </Link>
            <Link href="/solutions" className="text-foreground/60 transition-colors hover:text-foreground">
              Solutions
            </Link>
            <Link href="/promotions" className="text-foreground/60 transition-colors hover:text-foreground">
              Promotions
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex relative">
            <Input type="search" placeholder="Search..." className="pl-10" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0">
                {cartItemCount}
              </Badge>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
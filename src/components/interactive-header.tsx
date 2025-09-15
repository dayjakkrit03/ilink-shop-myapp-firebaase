'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { ShoppingCart } from '@/components/shopping-cart';

export const InteractiveHeader = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // In a real app, this would come from a global state
  const cartItemCount = 4; 

  return (
    <>
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
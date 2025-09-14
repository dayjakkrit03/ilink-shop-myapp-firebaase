'use client';

import { useState } from 'react';
import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ShoppingCart } from "@/components/shopping-cart";
import { MessageChat } from '@/components/message-chat';

const sarabun = Sarabun({
  variable: "--font-sarabun",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
});

// Metadata can still be exported from a client component layout
// export const metadata: Metadata = {
//   title: "ilink-shop",
//   description: "Interlink Shop - Your one-stop shop for networking equipment.",
//   icons: {
//     icon: "/favicon.svg",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Mock cart items count - in real app this would come from a global state
  const cartItemCount = 4;

  return (
    <html lang="en">
      <body className={`${sarabun.variable} font-sans antialiased`}>
        <Providers>
          <div className="min-h-screen bg-background flex flex-col">
            <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <MessageChat />
        </Providers>
      </body>
    </html>
  );
}
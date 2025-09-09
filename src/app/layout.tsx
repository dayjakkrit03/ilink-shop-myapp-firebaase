import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "ilink-shop",
  description: "Interlink Shop - Your one-stop shop for networking equipment.",
  icons: {
    icon: "/globe.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sarabun.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
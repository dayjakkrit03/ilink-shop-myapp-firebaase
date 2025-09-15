import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Footer } from "@/components/footer";
import { MessageChat } from '@/components/message-chat';
import { fetchSiteSetting } from '@/lib/data';
import { InteractiveHeader } from "@/components/interactive-header"; // Import the new wrapper

const sarabun = Sarabun({
  variable: "--font-sarabun",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "ilink-shop",
  description: "Interlink Shop - Your one-stop shop for networking equipment.",
  icons: {
    icon: "/favicon.svg",
  },
};

// This is a Server Component
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Fetching data on the server
  const footerLayout = await fetchSiteSetting('footer_layout');

  return (
    <html lang="en">
      <body className={`${sarabun.variable} font-sans antialiased`}>
        <Providers>
          <div className="min-h-screen bg-background flex flex-col">
            {/* The new InteractiveHeader handles its own state */}
            <InteractiveHeader />
            <main className="flex-grow">{children}</main>
            {/* Passing the fetched data to the Footer Client Component */}
            <Footer layout={footerLayout} />
          </div>
          <MessageChat />
        </Providers>
      </body>
    </html>
  );
}
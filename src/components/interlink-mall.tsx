"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

// ---- type จากฝั่ง API (ยืดหยุ่น: รองรับทั้ง snake/camel) ----
type StoreLike = {
  id: string | number;
  name: string;
  brand?: string | null;
  slug?: string | null;
  image_url?: string | null;
  logo_url?: string | null;
  imageUrl?: string | null;
  logoUrl?: string | null;
};

type InterlinkMallProps = {
  /** รายชื่อร้านจาก API */
  stores?: StoreLike[];
  /** แสดงจำนวนร้านกี่ร้าน (default 6) */
  limit?: number;
  /** path พื้นฐานของหน้าร้าน เช่น "/stores" (default) */
  basePath?: string;
  /** คลิกปุ่ม Shop More */
  onViewAllClick?: () => void;
  /** คลิกการ์ดร้าน */
  onStoreClick?: (store: StoreLike) => void;
};

/** ตัวแปลงจากข้อมูล API → shape ที่การ์ดต้องใช้ */
function toCardData(s: StoreLike | (StoreLike & { image?: string; logo?: string })) {
  const image =
    (s as any).image ?? s.image_url ?? s.imageUrl ?? "/placeholder.png";
  const logo =
    (s as any).logo ?? s.logo_url ?? s.logoUrl ?? "/placeholder.png";
  return { ...s, image, logo };
}

export const InterlinkMall = ({
  stores = [],
  limit = 6,
  basePath = "/stores",
  onViewAllClick,
  onStoreClick,
}: InterlinkMallProps) => {
  const router = useRouter();

  const data = stores
    .slice(0, limit)
    .map(toCardData);

  const handleViewAll = () => {
    if (onViewAllClick) return onViewAllClick();
    router.push(basePath);
  };

  const handleOpenStore = (store: StoreLike) => {
    if (onStoreClick) return onStoreClick(store);
    // ถ้ามี slug ให้ใช้ slug, ไม่งั้น fallback เป็น id
    if (store.slug) router.push(`${basePath}/${store.slug}`);
    else router.push(`${basePath}/${store.id}`);
  };

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">InterlinkMall</h2>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" onClick={handleViewAll}>
            Shop More
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.map((store) => (
            <div
              key={String(store.id)}
              className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => handleOpenStore(store)}
            >
              {/* Cover */}
              <div className="relative aspect-[4/3] bg-muted">
                <img
                  src={(store as any).image}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Logo Overlay */}
                <div className="absolute bottom-2 left-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-background border border-border">
                    <img
                      src={(store as any).logo}
                      alt={`${store.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="font-semibold text-sm text-foreground truncate">
                  {store.name}
                </h3>
                {store.brand && (
                  <p className="text-xs text-muted-foreground truncate">
                    {store.brand}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
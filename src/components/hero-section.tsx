'use client';

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Image from "next/image";

// NOTE: Exporting these types to be used in other components like HomeClient.
export type HeroBanner = {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link_url: string | null;
  badge_text: string | null;
  cta_text: string | null;
};

export type Promotion = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  link_url: string | null;
};


export type HeroSectionProps = {
  banners?: HeroBanner[];
  promotions?: Promotion[];
};

type DotButtonProps = {
  selected: boolean;
  onClick: () => void;
};

const DotButton = ({ selected, onClick }: DotButtonProps) => (
  <button
    className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all duration-300 ${selected ? 'w-6 sm:w-8 bg-primary' : 'bg-white/50 hover:bg-white'}`}
    type="button"
    onClick={onClick}
  />
);

const PromoIcon = ({ slug }: { slug: string }) => {
  if (slug === 'cash-on-delivery') return <div className="text-3xl group-hover:animate-bounce-gentle">💰</div>;
  if (slug === 'free-shipping') return <div className="text-3xl group-hover:animate-bounce-gentle">🚚</div>;
  if (slug === 'quality-guarantee') return <div className="text-3xl group-hover:animate-bounce-gentle">✅</div>;
  return null;
};

export const HeroSection = ({ banners = [], promotions = [] }: HeroSectionProps) => {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  const navigateSmart = (to: string | null) => {
    if (!to) return;
    if (/^https?:\/\//i.test(to)) {
      window.open(to, '_blank', 'noopener');
    } else {
      router.push(to);
    }
  };

  // For cards without images
  const promotionCardColors: { [key: string]: string } = {
    'cash-on-delivery': 'bg-gradient-to-r from-sale to-sale/80 text-sale-foreground',
    'free-shipping': 'bg-gradient-to-r from-success to-success/80 text-success-foreground',
    'quality-guarantee': 'bg-gradient-to-r from-warning to-warning/80 text-warning-foreground',
    default: 'bg-gradient-to-r from-info to-info/80 text-info-foreground',
  };

  // For overlays on top of images
  const promotionOverlayColors: { [key: string]: string } = {
    'cash-on-delivery': 'bg-sale/90',
    'free-shipping': 'bg-success/90',
    'quality-guarantee': 'bg-warning/90',
    default: 'bg-info/90',
  };

  return (
    <section className="bg-background">
      <div className="relative overflow-hidden">
          <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                  {banners.map((banner) => (
                      <div className="relative h-[320px] lg:h-[400px] flex-[0_0_100%]" key={banner.id}>
                          <Image
                              src={banner.image_url}
                              alt={banner.title}
                              fill
                              sizes="100vw"
                              className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-secondary/80">
                              <div className="container mx-auto px-4 h-full flex items-center">
                                  <div className="text-white w-full max-w-2xl animate-slide-up">
                                      {banner.badge_text && (
                                          <Badge
                                              className="mb-3 sm:mb-6 bg-sale/90 text-sale-foreground text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 animate-bounce-gentle shadow-glow cursor-pointer hover:bg-sale hover:scale-105 transition-all duration-200"
                                              onClick={() => banner.link_url && navigateSmart(banner.link_url)}
                                          >
                                              {banner.badge_text}
                                          </Badge>
                                      )}
                                      
                                      <h1 
                                        className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 leading-tight"
                                        dangerouslySetInnerHTML={{ __html: banner.title.replace(/Interlink/g, '<span class="text-accent animate-float inline-block">Interlink</span>') }}
                                      />
                                      
                                      <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-8 text-white/90">
                                          {banner.subtitle}
                                      </p>
                                      
                                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                          <Button
                                              size="sm"
                                              className="text-sm sm:text-lg px-4 sm:px-8 py-2 sm:py-4 shadow-glow transition-spring hover:scale-105 bg-orange-500 hover:bg-orange-600 text-white"
                                              onClick={() => banner.link_url && navigateSmart(banner.link_url || '/products')}
                                          >
                                              {banner.cta_text || 'ซื้อเลย'}
                                          </Button>
                                          <Button
                                              size="sm"
                                              variant="outline"
                                              className="text-sm sm:text-lg px-4 sm:px-8 py-2 sm:py-4 border-white sm:border-2 bg-white/10 text-white hover:bg-white hover:text-primary transition-spring hover:scale-105"
                                              onClick={() => router.push('/products')}
                                          >
                                              ดูสินค้าทั้งหมด
                                          </Button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <div className="flex items-center justify-center gap-2">
                  {scrollSnaps.map((_, index) => (
                      <DotButton
                          key={index}
                          selected={index === selectedIndex}
                          onClick={() => scrollTo(index)}
                      />
                  ))}
              </div>
          </div>
      </div>
      
      <div className="bg-gradient-subtle py-8">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {promotions.map((promo) => {
                const cardColor = promotionCardColors[promo.slug] || promotionCardColors.default;
                const overlayColor = promotionOverlayColors[promo.slug] || promotionOverlayColors.default;
                
                return (
                  <div 
                    key={promo.id}
                    onClick={() => navigateSmart(promo.link_url)}
                    className={`relative p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 group cursor-pointer overflow-hidden ${promo.image_url ? 'text-white' : cardColor}`}>
                    
                    {promo.image_url && (
                      <>
                        <Image
                          src={promo.image_url}
                          alt={promo.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 ${overlayColor}`}></div>
                      </>
                    )}
                    
                    <div className="relative flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{promo.title}</h3>
                        <p className="text-sm opacity-90">{promo.subtitle}</p>
                      </div>
                      <PromoIcon slug={promo.slug} />
                    </div>
                  </div>
                )
              })}
            </div>
        </div>
      </div>
    </section>
  );
};
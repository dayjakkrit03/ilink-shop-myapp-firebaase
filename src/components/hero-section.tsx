import { Button } from "@/components/ui/button";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[50vh] md:h-[70vh] text-white">
      <Image 
        src="/assets/hero-banner.jpg" 
        alt="Hero Banner" 
        layout="fill"
        objectFit="cover"
        quality={100}
        className="brightness-50"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          INTERLINK Cabling
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md">
          The Best of The World Class Cabling System
        </p>
        <Button size="lg" className="mt-8 bg-gradient-primary hover:shadow-glow transition-shadow">
          Shop Now
        </Button>
      </div>
    </section>
  );
};
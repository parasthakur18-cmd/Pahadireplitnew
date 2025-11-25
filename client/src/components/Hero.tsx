import { Leaf, Award, Droplet, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { Product } from '@shared/schema';

interface HeroProps {
  products?: Product[];
  onShopClick?: () => void;
  onStoryClick?: () => void;
}

export default function Hero({ products = [], onShopClick, onStoryClick }: HeroProps) {
  // Display only first product (Honey) for now
  const heroProduct = products[0];

  if (!heroProduct) return null;

  return (
    <section 
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        height: 'calc(100vh - 160px)',
        backgroundImage: `url(${heroProduct.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      data-testid="hero-fullscreen"
    >
      {/* Gradient overlay - left to right for content */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-start justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-8">
        <div className="space-y-4 md:space-y-6 w-full max-w-3xl">
          {/* Product Name as Headline */}
          <div className="space-y-2">
            <h1 
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
              data-testid="text-hero-product-name"
            >
              {heroProduct.name}
            </h1>
            <div className="h-0.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
          </div>

          {/* Description */}
          <p 
            className="text-sm sm:text-base text-white/90 leading-relaxed font-light"
            data-testid="text-hero-product-desc"
          >
            {heroProduct.tagline}
          </p>

          {/* Trust Elements */}
          <div className="space-y-2 pt-2">
            <div className="flex items-start gap-2">
              <Leaf className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-xs sm:text-sm">100% Organic & Chemical-Free</span>
            </div>
            <div className="flex items-start gap-2">
              <Droplet className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-xs sm:text-sm">Direct from 8,000+ ft elevation</span>
            </div>
            <div className="flex items-start gap-2">
              <Award className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-xs sm:text-sm">Zero compromise on quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 right-8 z-20">
        <button
          onClick={onStoryClick}
          className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
          data-testid="button-our-story-link"
        >
          Our Story <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/70" />
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Award, Droplet, ChevronDown } from "lucide-react";
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
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroProduct.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      data-testid="hero-fullscreen"
    >
      {/* Gradient overlay - left to right for content */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-start justify-center px-6 md:px-16 max-w-7xl">
        <div className="space-y-8 max-w-lg">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Award className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-white/90 font-medium">Laboratory Tested & Certified</span>
          </div>

          {/* Product Name as Headline */}
          <div>
            <h1 
              className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              data-testid="text-hero-product-name"
            >
              {heroProduct.name}
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
          </div>

          {/* Description */}
          <p 
            className="text-lg text-white/90 leading-relaxed font-light max-w-md"
            data-testid="text-hero-product-desc"
          >
            {heroProduct.tagline}
          </p>

          {/* Trust Elements */}
          <div className="space-y-3 pt-6">
            <div className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <span className="text-white/80">100% Organic & Chemical-Free</span>
            </div>
            <div className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span className="text-white/80">Direct from 8,000+ ft elevation</span>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
              <span className="text-white/80">Zero compromise on quality</span>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <Button 
              size="lg"
              data-testid="button-shop-now"
              onClick={onShopClick}
              className="text-base bg-orange-600 hover:bg-orange-700 text-white font-semibold px-12 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Shop Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
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

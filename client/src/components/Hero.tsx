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
  const [currentProductIdx, setCurrentProductIdx] = useState(0);
  const heroProducts = products.slice(0, 4);
  const currentProduct = heroProducts[currentProductIdx];

  const handleNext = () => {
    if (currentProductIdx < heroProducts.length - 1) {
      setCurrentProductIdx(currentProductIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentProductIdx > 0) {
      setCurrentProductIdx(currentProductIdx - 1);
    }
  };

  if (!currentProduct) return null;

  return (
    <>
      {/* Full Screen Hero Product Display */}
      <section 
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `url(${currentProduct.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        data-testid={`hero-fullscreen-${currentProductIdx}`}
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
                {currentProduct.name}
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
            </div>

            {/* Description */}
            <p 
              className="text-lg text-white/90 leading-relaxed font-light max-w-md"
              data-testid="text-hero-product-desc"
            >
              {currentProduct.tagline}
            </p>

            {/* Price */}
            <div className="pt-4">
              <p className="text-orange-300 text-4xl md:text-5xl font-bold" data-testid="text-hero-product-price">
                ₹{currentProduct.price}
              </p>
            </div>

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

        {/* Navigation Dots */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-3">
          {heroProducts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentProductIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentProductIdx 
                  ? 'bg-orange-500 w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              data-testid={`hero-dot-${idx}`}
            />
          ))}
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

      {/* Product Navigation Pages */}
      {heroProducts.map((product, idx) => {
        if (idx === 0) return null;
        return (
          <section
            key={product.id}
            className="relative w-full h-screen overflow-hidden flex items-center justify-center"
            style={{
              backgroundImage: `url(${product.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            data-testid={`hero-product-page-${idx}`}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-start justify-center px-6 md:px-16 max-w-7xl">
              <div className="space-y-8 max-w-lg">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Award className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-white/90 font-medium">Laboratory Tested & Certified</span>
                </div>

                <div>
                  <h1 
                    className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                    data-testid={`text-hero-product-name-${idx}`}
                  >
                    {product.name}
                  </h1>
                  <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
                </div>

                <p 
                  className="text-lg text-white/90 leading-relaxed font-light max-w-md"
                  data-testid={`text-hero-product-desc-${idx}`}
                >
                  {product.tagline}
                </p>

                <div className="pt-4">
                  <p className="text-orange-300 text-4xl md:text-5xl font-bold" data-testid={`text-hero-product-price-${idx}`}>
                    ₹{product.price}
                  </p>
                </div>

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

                <div className="pt-8">
                  <Button 
                    size="lg"
                    data-testid={`button-shop-now-${idx}`}
                    onClick={onShopClick}
                    className="text-base bg-orange-600 hover:bg-orange-700 text-white font-semibold px-12 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
              <ChevronDown className="w-6 h-6 text-white/70" />
            </div>
          </section>
        );
      })}
    </>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Product } from '@shared/schema';

interface HeroProps {
  products?: Product[];
  onShopClick?: () => void;
  onStoryClick?: () => void;
}

export default function Hero({ products = [], onShopClick, onStoryClick }: HeroProps) {
  // Get all featured products to display on shelves
  const allProducts = products;
  const topShelfProducts = allProducts.slice(0, 5);
  const bottomShelfProducts = allProducts.slice(5, 10);

  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{
      backgroundImage: `linear-gradient(135deg, #4a7c59 0%, #5a8f6b 50%, #6b9a6b 100%)`,
    }}>
      {/* Natural grass/nature texture background */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,.05) 2px, rgba(255,255,255,.05) 4px), 
                           repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px)`,
        }}
      />

      {/* Main shelf display */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4 md:px-12">
        
        {/* Top Shelf */}
        <div className="relative w-full max-w-6xl mb-20 md:mb-32">
          {/* Wooden shelf visual */}
          <div className="relative bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-lg shadow-2xl" style={{
            height: '8px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}>
            {/* Shelf wood texture */}
            <div className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,90,43,.3) 2px, rgba(139,90,43,.3) 4px)`,
              }}
            />
          </div>

          {/* Products on top shelf */}
          <div className="absolute -top-32 md:-top-40 left-0 right-0 flex items-flex-end justify-center gap-3 md:gap-6 px-2">
            {topShelfProducts.map((product, idx) => (
              <div key={product.id} className="flex flex-col items-center group" data-testid={`hero-product-${idx}`}>
                <div className="relative w-20 h-32 md:w-28 md:h-48 bg-white/10 rounded-lg overflow-hidden border border-white/20 group-hover:border-white/40 transition-all transform group-hover:-translate-y-2 group-hover:shadow-2xl" 
                  style={{
                    transform: `translateY(${(idx - 2) * 8}px)`,
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    data-testid={`hero-img-${idx}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-white text-xs md:text-sm font-semibold leading-tight" data-testid={`hero-name-${idx}`}>
                    {product.name.split(' ')[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Shelf */}
        <div className="relative w-full max-w-6xl mt-12">
          {/* Wooden shelf visual */}
          <div className="relative bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-lg shadow-2xl" style={{
            height: '8px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}>
            <div className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,90,43,.3) 2px, rgba(139,90,43,.3) 4px)`,
              }}
            />
          </div>

          {/* Products on bottom shelf */}
          <div className="absolute -top-32 md:-top-40 left-0 right-0 flex items-flex-end justify-center gap-3 md:gap-6 px-2">
            {bottomShelfProducts.map((product, idx) => (
              <div key={product.id} className="flex flex-col items-center group" data-testid={`hero-product-bottom-${idx}`}>
                <div className="relative w-20 h-32 md:w-28 md:h-48 bg-white/10 rounded-lg overflow-hidden border border-white/20 group-hover:border-white/40 transition-all transform group-hover:-translate-y-2 group-hover:shadow-2xl"
                  style={{
                    transform: `translateY(${(idx - 2) * 8}px)`,
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    data-testid={`hero-img-bottom-${idx}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-white text-xs md:text-sm font-semibold leading-tight" data-testid={`hero-name-bottom-${idx}`}>
                    {product.name.split(' ')[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Buttons - Fixed Bottom */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col sm:flex-row gap-4 justify-center z-20">
        <Button 
          size="lg"
          data-testid="button-shop-now"
          onClick={onShopClick}
          className="text-base bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8"
        >
          Shop Now <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <Button 
          size="lg"
          variant="outline"
          data-testid="button-our-story"
          onClick={onStoryClick}
          className="text-base font-semibold border-2 border-white text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
        >
          Our Story
        </Button>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from '@assets/generated_images/premium_himalayan_mountain_sunrise_landscape.png';
import type { Product } from '@shared/schema';

interface HeroProps {
  products?: Product[];
  onShopClick?: () => void;
  onStoryClick?: () => void;
}

export default function Hero({ products = [], onShopClick, onStoryClick }: HeroProps) {
  // Get first 4 featured products to display
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="relative min-h-[600px] md:min-h-[750px] flex items-center overflow-hidden bg-gradient-to-b from-[#6b9a6b] to-[#588a58]">
      {/* Background with natural imagery and dotted border effect */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Dotted border overlay effect */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          
          {/* Left Side - Premium Text Box */}
          <div className="flex items-center justify-center">
            <div className="bg-amber-50/95 backdrop-blur-sm border-4 border-dashed border-amber-900/30 p-8 md:p-12 text-center max-w-sm">
              <h2 
                className="font-serif text-3xl md:text-4xl font-bold text-amber-900 mb-4 leading-tight"
                data-testid="text-hero-tagline"
              >
                PURE, AUTHENTIC & HIMALAYAN
              </h2>
              <div className="flex justify-center gap-2 mb-4">
                <span className="text-amber-700 text-lg">✦</span>
                <span className="text-amber-700 text-lg">✦</span>
                <span className="text-amber-700 text-lg">✦</span>
              </div>
              <p 
                className="text-amber-900/80 text-sm md:text-base leading-relaxed"
                data-testid="text-hero-description"
              >
                Direct from mountain farms. Lab-tested. Sustainably harvested. Zero compromise on quality.
              </p>
            </div>
          </div>

          {/* Right Side - Product Display Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {featuredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className={`flex flex-col items-center justify-center group ${
                    idx % 2 === 0 ? 'mt-8' : ''
                  }`}
                  data-testid={`hero-product-${idx}`}
                >
                  {/* Product Container */}
                  <div className="relative w-full h-40 md:h-56 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 group-hover:border-white/40 transition-all hover:shadow-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      data-testid={`hero-img-${idx}`}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Product Name */}
                  <div className="mt-3 text-center">
                    <h3 className="font-serif text-white text-sm md:text-base font-semibold leading-tight" data-testid={`hero-name-${idx}`}>
                      {product.name}
                    </h3>
                    <p className="text-white/70 text-xs mt-1" data-testid={`hero-price-${idx}`}>
                      ₹{product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons - Below Grid */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 md:mt-16">
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
            className="text-base font-semibold border-2 border-amber-900/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          >
            Our Story
          </Button>
        </div>
      </div>
    </section>
  );
}

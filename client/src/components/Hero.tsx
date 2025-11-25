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
  // Get first 8 featured products to display in full-page layout
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#6b9a6b] to-[#588a58]">
      {/* Background with Himalayan mountain imagery */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Dark overlay for better product visibility */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Dotted border overlay effect */}
      <div className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Full Page Product Display */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 md:px-8 py-8">
        {/* Products Grid - Full Width */}
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
            {featuredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="flex flex-col items-center justify-center group"
                data-testid={`hero-product-${idx}`}
              >
                {/* Product Container */}
                <div className="relative w-full aspect-square bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 group-hover:border-white/40 transition-all hover:shadow-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    data-testid={`hero-img-${idx}`}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Product Info - Overlay on image bottom */}
                <div className="absolute bottom-0 left-0 right-0 text-center p-3 bg-gradient-to-t from-black/60 to-transparent w-full">
                  <h3 className="font-serif text-white text-xs md:text-sm font-semibold leading-tight line-clamp-2" data-testid={`hero-name-${idx}`}>
                    {product.name}
                  </h3>
                  <p className="text-orange-300 text-xs md:text-sm font-bold mt-1" data-testid={`hero-price-${idx}`}>
                    ₹{product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons - Bottom Center */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>
    </section>
  );
}

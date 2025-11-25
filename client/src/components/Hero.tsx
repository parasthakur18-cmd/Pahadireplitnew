import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Award, Droplet } from "lucide-react";
import heroImage from '@assets/generated_images/premium_minimalist_himalayan_landscape_background.png';
import type { Product } from '@shared/schema';

interface HeroProps {
  products?: Product[];
  onShopClick?: () => void;
  onStoryClick?: () => void;
}

export default function Hero({ products = [], onShopClick, onStoryClick }: HeroProps) {
  // Get featured products (4 hero products)
  const heroProducts = products.slice(0, 4);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* Premium background with elegant overlay */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Elegant gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Premium Content */}
          <div className="space-y-8 max-w-lg">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Award className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-white/90 font-medium">Laboratory Tested & Certified</span>
            </div>

            {/* Headline - Benefit-driven, emotional */}
            <div>
              <h1 
                className="font-serif text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
                data-testid="text-hero-headline"
              >
                Experience Pure Himalayan Wellness
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
            </div>

            {/* Subheadline - Clear value proposition */}
            <p 
              className="text-lg text-white/90 leading-relaxed font-light"
              data-testid="text-hero-subheadline"
            >
              Authentic products from mountain farms. Lab-tested. Sustainably sourced. Direct to your door.
            </p>

            {/* Trust Elements */}
            <div className="space-y-3 pt-4">
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

            {/* Single Primary CTA */}
            <div className="pt-4">
              <Button 
                size="lg"
                data-testid="button-shop-now"
                onClick={onShopClick}
                className="text-base bg-orange-600 hover:bg-orange-700 text-white font-semibold px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Shop Our Collection <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right: Product Showcase Grid */}
          <div className="grid grid-cols-2 gap-6">
            {heroProducts.map((product, idx) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-lg backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all hover:shadow-2xl cursor-pointer"
                data-testid={`hero-product-card-${idx}`}
              >
                {/* Product Image Container */}
                <div className="relative w-full aspect-square bg-white/5 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-testid={`hero-product-img-${idx}`}
                  />
                  {/* Elegant overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Info - Always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-serif text-sm md:text-base font-semibold leading-tight" data-testid={`hero-product-name-${idx}`}>
                    {product.name}
                  </h3>
                  <p className="text-orange-300 text-xs md:text-sm font-bold mt-2" data-testid={`hero-product-price-${idx}`}>
                    ₹{product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom brand story link */}
      <div className="absolute bottom-8 right-8 z-20">
        <button
          onClick={onStoryClick}
          className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
          data-testid="button-our-story-link"
        >
          Our Story <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

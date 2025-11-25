import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from '@assets/generated_images/premium_himalayan_mountain_sunrise_landscape.png';

interface HeroProps {
  onShopClick?: () => void;
  onStoryClick?: () => void;
}

export default function Hero({ onShopClick, onStoryClick }: HeroProps) {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden bg-gradient-to-b from-[#6b9a6b] to-[#588a58]">
      {/* Background with natural imagery and dotted border effect */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
        }}
      />
      
      {/* Dotted border overlay effect */}
      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
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

          {/* Right Side - Product Display */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[300px] md:h-[400px]">
              <img 
                src={heroImage}
                alt="The Pahadi Company - Premium Himalayan Products"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
                data-testid="img-hero-products"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
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
            className="text-base font-semibold border-2 border-amber-900/40 text-amber-900 bg-amber-50/50 hover:bg-amber-50 backdrop-blur-sm"
          >
            Our Story
          </Button>
        </div>
      </div>
    </section>
  );
}

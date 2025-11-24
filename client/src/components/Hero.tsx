import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from '@assets/generated_images/himalayan_landscape_hero_image.png';

interface HeroProps {
  onShopClick?: () => void;
  onStoryClick?: () => void;
}

export default function Hero({ onShopClick, onStoryClick }: HeroProps) {
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          filter: 'brightness(0.7)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 
          data-testid="text-hero-title"
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          Pure Himalayan Goodness
        </h1>
        <p 
          data-testid="text-hero-subtitle"
          className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Discover authentic honey, ghee, and wellness products sourced directly from the mountains. 100% pure, lab tested, and sustainably harvested.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            data-testid="button-shop-now"
            onClick={onShopClick}
            className="text-base"
          >
            Shop Now <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            data-testid="button-our-story"
            onClick={onStoryClick}
            className="text-base bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
          >
            Our Story
          </Button>
        </div>
      </div>
    </section>
  );
}

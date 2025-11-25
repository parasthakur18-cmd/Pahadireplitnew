import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductShowcaseProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

export default function ProductShowcase({ products, onProductClick }: ProductShowcaseProps) {
  // Get combo products
  const comboProducts = products.filter(p => p.category === 'combos' || p.category === 'Combos');

  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden bg-gradient-to-b from-[#6b9a6b] to-[#588a58] py-20">
      {/* Dotted border overlay effect */}
      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4" data-testid="text-showcase-title">
            Premium Combo Collections
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Carefully curated combinations of our finest Himalayan products for ultimate wellness
          </p>
        </div>

        {/* Product Grid Showcase */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {comboProducts.map((product, idx) => (
            <div
              key={product.id}
              className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg overflow-hidden hover:border-white/40 transition-all hover:shadow-2xl"
              data-testid={`combo-card-${idx}`}
            >
              {/* Product Image */}
              <div className="relative h-80 overflow-hidden bg-black/10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  data-testid={`combo-img-${idx}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Product Info */}
              <div className="p-6 bg-white/95 backdrop-blur-sm">
                <h3 className="font-serif text-xl font-bold text-amber-900 mb-2" data-testid={`combo-name-${idx}`}>
                  {product.name}
                </h3>
                <p className="text-sm text-amber-700 mb-3" data-testid={`combo-tagline-${idx}`}>
                  {product.tagline}
                </p>
                <p className="text-xs text-gray-600 mb-4 line-clamp-2" data-testid={`combo-desc-${idx}`}>
                  {product.description}
                </p>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600" data-testid={`combo-price-${idx}`}>
                    ₹{product.price}
                  </span>
                  <Button
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={() => onProductClick?.(product)}
                    data-testid={`combo-btn-${idx}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/20">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✦</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Curated Combos</h4>
            <p className="text-white/70 text-sm">
              Expertly selected combinations for maximum synergy
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✦</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Better Value</h4>
            <p className="text-white/70 text-sm">
              Save ₹200-700 when you buy products together
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✦</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Premium Gift</h4>
            <p className="text-white/70 text-sm">
              Perfect for gifting to loved ones and offices
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-white text-amber-900 hover:bg-white/90 font-semibold px-8"
            data-testid="button-explore-combos"
          >
            Explore All Combos <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

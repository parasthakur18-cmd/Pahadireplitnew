import ProductCard from './ProductCard';
import type { Product } from '@shared/schema';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  onViewAll?: () => void;
}

export default function FeaturedProducts({ products, onAddToCart, onViewDetails, onViewAll }: FeaturedProductsProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" data-testid="text-featured-title">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our handpicked selection of Himalayan treasures
            </p>
          </div>
          {onViewAll && (
            <Button 
              variant="outline"
              onClick={onViewAll}
              data-testid="button-view-all"
              className="hidden md:flex items-center gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>

        {onViewAll && (
          <div className="mt-8 text-center md:hidden">
            <Button 
              variant="outline"
              onClick={onViewAll}
              data-testid="button-view-all-mobile"
              className="w-full sm:w-auto"
            >
              View All Products <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

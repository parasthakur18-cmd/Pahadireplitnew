import { useLocation } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const [, setLocation] = useLocation();

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(product);
    } else {
      setLocation(`/product/${product.slug}`);
    }
  };

  return (
    <Card 
      className="group overflow-hidden hover-elevate cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={handleCardClick}
      data-testid={`card-product-${product.id}`}
    >
      <div className="w-full h-80 overflow-hidden bg-muted">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          data-testid={`img-product-${product.id}`}
        />
        {product.inStock === 0 && (
          <Badge 
            variant="secondary"
            className="absolute top-3 right-3"
            data-testid={`badge-out-of-stock-${product.id}`}
          >
            Out of Stock
          </Badge>
        )}
        {product.category === 'featured' && (
          <Badge 
            className="absolute top-3 left-3"
            data-testid={`badge-featured-${product.id}`}
          >
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 
          className="font-serif text-xl font-semibold mb-2"
          data-testid={`text-product-name-${product.id}`}
        >
          {product.name}
        </h3>
        <p 
          className="text-sm text-muted-foreground mb-3"
          data-testid={`text-product-tagline-${product.id}`}
        >
          {product.tagline}
        </p>
        <div className="flex items-baseline gap-2">
          <span 
            className="text-2xl font-bold"
            data-testid={`text-product-price-${product.id}`}
          >
            ₹{product.price}
          </span>
          <span className="text-sm text-muted-foreground">/ {product.weight}</span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product);
          }}
          disabled={product.inStock === 0}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}

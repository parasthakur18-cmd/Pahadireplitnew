import ProductCard from '../ProductCard';
import heroImage from '@assets/generated_images/himalayan_wildflower_honey_product.png';

export default function ProductCardExample() {
  const sampleProduct = {
    id: '1',
    name: 'Himalayan Wildflower Honey',
    slug: 'himalayan-wildflower-honey',
    tagline: 'Raw, unprocessed nectar from mountain blooms',
    description: 'Pure wildflower honey harvested from pristine Himalayan valleys',
    price: '599',
    weight: '500g',
    image: heroImage,
    category: 'featured',
    inStock: 10,
    benefits: ['Rich in antioxidants', 'Natural energy boost', 'Supports immunity'],
    ingredients: '100% Pure Wildflower Honey',
    usage: 'Take 1-2 teaspoons daily or add to warm beverages',
  };

  return (
    <div className="max-w-sm">
      <ProductCard 
        product={sampleProduct}
        onAddToCart={(p) => console.log('Added to cart:', p.name)}
        onViewDetails={(p) => console.log('View details:', p.name)}
      />
    </div>
  );
}

import FeaturedProducts from '../FeaturedProducts';
import honeyImage from '@assets/generated_images/himalayan_wildflower_honey_product.png';
import gheeImage from '@assets/generated_images/pahadi_desi_ghee_product.png';
import teaImage from '@assets/generated_images/himalayan_herbal_tea_blend.png';
import oilImage from '@assets/generated_images/cold-pressed_walnut_oil_product.png';

export default function FeaturedProductsExample() {
  const products = [
    {
      id: '1',
      name: 'Himalayan Wildflower Honey',
      slug: 'honey',
      tagline: 'Raw, unprocessed nectar from mountain blooms',
      description: 'Pure wildflower honey',
      price: '599',
      weight: '500g',
      image: honeyImage,
      category: 'featured',
      inStock: 10,
      benefits: [],
      ingredients: 'Honey',
      usage: 'Daily',
    },
    {
      id: '2',
      name: 'Pahadi Desi Ghee',
      slug: 'ghee',
      tagline: 'Grass-fed, small batch artisanal ghee',
      description: 'Traditional ghee',
      price: '799',
      weight: '500g',
      image: gheeImage,
      category: 'featured',
      inStock: 5,
      benefits: [],
      ingredients: 'Ghee',
      usage: 'Cooking',
    },
    {
      id: '3',
      name: 'Himalayan Herbal Tea',
      slug: 'tea',
      tagline: 'Immunity-boosting mountain herbs',
      description: 'Herbal tea blend',
      price: '349',
      weight: '100g',
      image: teaImage,
      category: 'tea',
      inStock: 20,
      benefits: [],
      ingredients: 'Herbs',
      usage: 'Daily',
    },
    {
      id: '4',
      name: 'Cold-Pressed Walnut Oil',
      slug: 'oil',
      tagline: 'First cold press, nutrient-rich',
      description: 'Walnut oil',
      price: '699',
      weight: '250ml',
      image: oilImage,
      category: 'oil',
      inStock: 8,
      benefits: [],
      ingredients: 'Walnuts',
      usage: 'Cooking',
    },
  ];

  return (
    <FeaturedProducts
      products={products}
      onAddToCart={(p) => console.log('Add to cart:', p.name)}
      onViewDetails={(p) => console.log('View details:', p.name)}
      onViewAll={() => console.log('View all clicked')}
    />
  );
}

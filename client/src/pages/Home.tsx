import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import TrustBadges from '@/components/TrustBadges';
import SourcingSection from '@/components/SourcingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import { useSEOMeta } from '@/components/SEOMeta';
import type { Product } from '@shared/schema';

// TODO: remove mock functionality - Import product images (Premium Himalayan mountain backdrop style + Professional packaging)
import honeyImage from '@assets/generated_images/himalayan_wildflower_honey_premium_product_shot.png';
import gheeImage from '@assets/Front (1)_1764044695334.png';
import teaImage from '@assets/generated_images/himalayan_herbal_tea_premium_package_shot.png';
import oilImage from '@assets/generated_images/cold-pressed_walnut_oil_premium_product_photo.png';
import amlaImage from '@assets/generated_images/organic_amla_powder_premium_package_shot.png';
import saltImage from '@assets/generated_images/himalayan_pink_salt_premium_product_photo.png';
import shilajitImage from '@assets/generated_images/shilajit_resin_premium_product_photo.png';
import giftSetImage from '@assets/generated_images/mountain_gift_set_premium_product_shot.png';
import rajmaImage from '@assets/1-1 Mockup for Amazon (1)_1764044699891.png';

// TODO: remove mock functionality - Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Himalayan Wildflower Honey',
    slug: 'himalayan-wildflower-honey',
    tagline: 'Raw, unprocessed nectar from mountain blooms',
    description: 'Pure wildflower honey harvested from pristine Himalayan valleys at 8,000+ feet. Rich in antioxidants, enzymes, and natural minerals. Never heated, never filtered.',
    price: '599.00',
    weight: '500g',
    image: honeyImage,
    category: 'featured',
    inStock: 45,
    benefits: ['Rich in antioxidants', 'Natural energy boost', 'Supports immunity', 'Anti-inflammatory properties', 'Aids digestion'],
    ingredients: '100% Pure Raw Wildflower Honey from Himalayan flora including rhododendron, wild roses, and mountain herbs',
    usage: 'Take 1-2 teaspoons daily on empty stomach or add to warm (not hot) beverages. Perfect as a natural sweetener in tea, smoothies, or drizzled over yogurt.',
  },
  {
    id: '2',
    name: 'Pahadi Desi Ghee',
    slug: 'pahadi-desi-ghee',
    tagline: 'Grass-fed, small batch artisanal ghee',
    description: 'Traditional A2 ghee from indigenous Pahadi cows grazing freely on mountain pastures. Hand-churned using the ancient bilona method for superior taste and nutrition.',
    price: '799.00',
    weight: '500g',
    image: gheeImage,
    category: 'featured',
    inStock: 28,
    benefits: ['Rich in A2 protein', 'High smoke point for cooking', 'Supports brain health', 'Rich in vitamins A, D, E, K', 'Improves digestion'],
    ingredients: 'Pure A2 milk from grass-fed Pahadi cows, cultured using traditional dahi method and hand-churned',
    usage: 'Use for high-heat cooking, add to dal, rice, or rotis. Take 1 teaspoon on empty stomach for digestive health. Perfect for Ayurvedic practices.',
  },
  {
    id: '3',
    name: 'Himalayan Herbal Tea Blend',
    slug: 'himalayan-herbal-tea',
    tagline: 'Immunity-boosting mountain herbs blend',
    description: 'Carefully curated blend of wild Himalayan herbs including tulsi, lemongrass, ginger, and mountain mint. Naturally caffeine-free and packed with antioxidants.',
    price: '349.00',
    weight: '100g',
    image: teaImage,
    category: 'tea',
    inStock: 62,
    benefits: ['Boosts immunity', 'Reduces stress and anxiety', 'Aids respiratory health', 'Rich in antioxidants', 'Caffeine-free energy'],
    ingredients: 'Organic Tulsi, Himalayan Lemongrass, Fresh Ginger, Wild Mountain Mint, Licorice Root, hand-picked at peak freshness',
    usage: 'Steep 1 teaspoon in hot water for 5-7 minutes. Enjoy 2-3 cups daily. Can be had with honey or as is. Perfect morning or evening ritual.',
  },
  {
    id: '4',
    name: 'Cold-Pressed Walnut Oil',
    slug: 'cold-pressed-walnut-oil',
    tagline: 'First cold press, nutrient-rich',
    description: 'Premium walnut oil extracted from hand-cracked Himalayan walnuts using traditional wooden presses. Rich in Omega-3 fatty acids and vitamin E.',
    price: '699.00',
    weight: '250ml',
    image: oilImage,
    category: 'oil',
    inStock: 35,
    benefits: ['Rich in Omega-3', 'Supports heart health', 'Anti-inflammatory', 'Good for skin and hair', 'Brain health'],
    ingredients: '100% Pure Cold-Pressed Himalayan Walnuts (Juglans regia), single origin, first press only',
    usage: 'Drizzle over salads, use in dressings, or add to smoothies. Not for high-heat cooking. Can be applied topically for hair and skin nourishment.',
  },
  {
    id: '5',
    name: 'Organic Amla Powder',
    slug: 'organic-amla-powder',
    tagline: 'Sun-dried Indian gooseberry superfood',
    description: 'Pure amla powder from wild Himalayan gooseberries, sun-dried and stone-ground to preserve vitamin C and natural nutrients.',
    price: '299.00',
    weight: '200g',
    image: amlaImage,
    category: 'wellness',
    inStock: 58,
    benefits: ['Highest natural vitamin C', 'Boosts immunity', 'Promotes hair growth', 'Improves digestion', 'Antioxidant powerhouse'],
    ingredients: '100% Organic Wild Amla (Emblica officinalis), sun-dried and stone-ground, no additives',
    usage: 'Mix 1 teaspoon with water, juice, or honey daily. Can be used in hair masks or face packs. Best taken on empty stomach.',
  },
  {
    id: '6',
    name: 'Himalayan Pink Salt',
    slug: 'himalayan-pink-salt',
    tagline: 'Coarse, mineral-rich ancient salt',
    description: 'Authentic pink salt harvested from ancient Himalayan deposits. Contains 84 trace minerals and elements naturally occurring in the human body.',
    price: '249.00',
    weight: '1kg',
    image: saltImage,
    category: 'pantry',
    inStock: 92,
    benefits: ['84 trace minerals', 'Supports electrolyte balance', 'Aids hydration', 'Natural detoxifier', 'Better than table salt'],
    ingredients: '100% Pure Himalayan Pink Rock Salt (Halite) from Khewra mines, unrefined and unprocessed',
    usage: 'Use as regular cooking salt or for salt water therapy. Grind fresh for maximum flavor. Ideal for salt lamps and baths.',
  },
  {
    id: '7',
    name: 'Shilajit Resin',
    slug: 'shilajit-resin',
    tagline: 'Purified Himalayan mineral resin',
    description: 'Authentic shilajit resin sourced from high-altitude Himalayan rocks. Lab-tested for purity, rich in fulvic acid and over 85 minerals.',
    price: '1299.00',
    weight: '20g',
    image: shilajitImage,
    category: 'wellness',
    inStock: 18,
    benefits: ['Boosts energy and stamina', 'Supports testosterone', 'Enhances cognitive function', 'Anti-aging properties', 'Improves nutrient absorption'],
    ingredients: 'Pure Himalayan Shilajit Resin (Asphaltum punjabianum), purified through traditional filtration, lab-tested for heavy metals',
    usage: 'Dissolve a pea-sized portion in warm water or milk. Take once daily, preferably in morning. Start with smaller dose and increase gradually.',
  },
  {
    id: '8',
    name: 'Mountain Honey & Herb Gift Set',
    slug: 'gift-set',
    tagline: 'Curated wellness gift collection',
    description: 'Thoughtfully curated gift set featuring our bestsellers: Wildflower Honey (250g), Herbal Tea (50g), and Amla Powder (100g) in beautiful eco-friendly packaging.',
    price: '999.00',
    weight: 'Gift Set',
    image: giftSetImage,
    category: 'featured',
    inStock: 24,
    benefits: ['Perfect gift option', 'Eco-friendly packaging', 'Bestseller collection', 'Wellness starter pack', 'Beautiful presentation'],
    ingredients: 'Includes: Wildflower Honey 250g, Herbal Tea Blend 50g, Organic Amla Powder 100g, packaged with care',
    usage: 'A perfect introduction to Himalayan wellness. Each item has individual usage instructions. Makes an ideal gift for health-conscious loved ones.',
  },
  {
    id: '9',
    name: 'Pahadi Rajma (Kidney Beans)',
    slug: 'pahadi-rajma',
    tagline: 'Premium organic kidney beans from the mountains',
    description: 'Hand-picked organic rajma (kidney beans) from mountain farms. Rich in protein and fiber, perfect for dal, curries, and salads. Freshly harvested and carefully dried to maintain nutritional value.',
    price: '349.00',
    weight: '500g',
    image: rajmaImage,
    category: 'featured',
    inStock: 72,
    benefits: ['High in plant protein', 'Rich in dietary fiber', 'Good for digestion', 'Heart-healthy legume', 'Sustainable farming'],
    ingredients: '100% Organic Pahadi Rajma (Kidney Beans) from mountain farms, naturally dried',
    usage: 'Soak overnight, boil for 20-30 minutes. Perfect for traditional Indian dal, rajma rice, or mixed vegetable curries. Use in soups and salads.',
  },
];

interface CartItem extends Product {
  quantity: number;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    console.log('Added to cart:', product.name);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout');
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Cart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      >
        <div className="hidden" />
      </Cart>

      <Header 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
      />
      
      <Hero 
        onShopClick={() => {
          const element = document.getElementById('featured-products');
          element?.scrollIntoView({ behavior: 'smooth' });
        }}
        onStoryClick={() => setLocation('/about')}
      />

      <div id="featured-products">
        <FeaturedProducts
          products={mockProducts}
          onAddToCart={handleAddToCart}
          onViewDetails={(product) => console.log('View details:', product.name)}
          onViewAll={() => console.log('View all products')}
        />
      </div>

      <TrustBadges />
      
      <SourcingSection />
      
      <TestimonialsSection />
      
      <Footer />
    </div>
  );
}

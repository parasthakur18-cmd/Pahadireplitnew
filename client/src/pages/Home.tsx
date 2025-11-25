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

// TODO: remove mock functionality - Import product images (Consistent sized premium products)
import honeyImage from '@assets/generated_images/premium_honey_with_spoon_luxurious.png';
import gheeImage from '@assets/generated_images/pahadi_desi_ghee_premium_product.png';
import teaImage from '@assets/generated_images/himalayan_herbal_tea_premium.png';
import oilImage from '@assets/generated_images/walnut_oil_premium_product.png';
import amlaImage from '@assets/generated_images/amla_powder_premium_product.png';
import saltImage from '@assets/generated_images/pink_salt_premium_product.png';
import shilajitImage from '@assets/generated_images/shilajit_resin_premium_product.png';
import giftSetImage from '@assets/generated_images/gift_set_premium_combo.png';
import rajmaImage from '@assets/generated_images/rajma_premium_product.png';
import buranshImage from '@assets/generated_images/buransh_juice_premium_product.png';

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
    category: 'Ghee & Honey',
    inStock: 45,
    benefits: ['Rich in antioxidants', 'Natural energy boost', 'Supports immunity', 'Anti-inflammatory properties', 'Aids digestion'],
    ingredients: '100% Pure Raw Wildflower Honey from Himalayan flora including rhododendron, wild roses, and mountain herbs',
    usage: 'Take 1-2 teaspoons daily on empty stomach or add to warm (not hot) beverages. Perfect as a natural sweetener in tea, smoothies, or drizzled over yogurt.',
    variants: null,
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
    category: 'Ghee & Honey',
    inStock: 28,
    benefits: ['Rich in A2 protein', 'High smoke point for cooking', 'Supports brain health', 'Rich in vitamins A, D, E, K', 'Improves digestion'],
    ingredients: 'Pure A2 milk from grass-fed Pahadi cows, cultured using traditional dahi method and hand-churned',
    usage: 'Use for high-heat cooking, add to dal, rice, or rotis. Take 1 teaspoon on empty stomach for digestive health. Perfect for Ayurvedic practices.',
    variants: null,
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
    category: 'Liquids & Beverages',
    inStock: 62,
    benefits: ['Boosts immunity', 'Reduces stress and anxiety', 'Aids respiratory health', 'Rich in antioxidants', 'Caffeine-free energy'],
    ingredients: 'Organic Tulsi, Himalayan Lemongrass, Fresh Ginger, Wild Mountain Mint, Licorice Root, hand-picked at peak freshness',
    usage: 'Steep 1 teaspoon in hot water for 5-7 minutes. Enjoy 2-3 cups daily. Can be had with honey or as is. Perfect morning or evening ritual.',
    variants: null,
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
    category: 'Best Sellers',
    inStock: 35,
    benefits: ['Rich in Omega-3', 'Supports heart health', 'Anti-inflammatory', 'Good for skin and hair', 'Brain health'],
    ingredients: '100% Pure Cold-Pressed Himalayan Walnuts (Juglans regia), single origin, first press only',
    usage: 'Drizzle over salads, use in dressings, or add to smoothies. Not for high-heat cooking. Can be applied topically for hair and skin nourishment.',
    variants: null,
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
    category: 'Best Sellers',
    inStock: 58,
    benefits: ['Highest natural vitamin C', 'Boosts immunity', 'Promotes hair growth', 'Improves digestion', 'Antioxidant powerhouse'],
    ingredients: '100% Organic Wild Amla (Emblica officinalis), sun-dried and stone-ground, no additives',
    usage: 'Mix 1 teaspoon with water, juice, or honey daily. Can be used in hair masks or face packs. Best taken on empty stomach.',
    variants: null,
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
    category: 'Limited Edition',
    inStock: 92,
    benefits: ['84 trace minerals', 'Supports electrolyte balance', 'Aids hydration', 'Natural detoxifier', 'Better than table salt'],
    ingredients: '100% Pure Himalayan Pink Rock Salt (Halite) from Khewra mines, unrefined and unprocessed',
    usage: 'Use as regular cooking salt or for salt water therapy. Grind fresh for maximum flavor. Ideal for salt lamps and baths.',
    variants: null,
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
    category: 'Limited Edition',
    inStock: 18,
    benefits: ['Boosts energy and stamina', 'Supports testosterone', 'Enhances cognitive function', 'Anti-aging properties', 'Improves nutrient absorption'],
    ingredients: 'Pure Himalayan Shilajit Resin (Asphaltum punjabianum), purified through traditional filtration, lab-tested for heavy metals',
    usage: 'Dissolve a pea-sized portion in warm water or milk. Take once daily, preferably in morning. Start with smaller dose and increase gradually.',
    variants: null,
  },
  {
    id: '8',
    name: 'Ghee + Honey Combo',
    slug: 'ghee-honey-combo',
    tagline: 'Perfect wellness duo - Top sellers together',
    description: 'Premium combo featuring our bestselling Pahadi Desi Ghee (500g) and Himalayan Wildflower Honey (500g). The perfect pair for cooking and daily wellness. Together they enhance nutrition absorption.',
    price: '1299.00',
    weight: 'Combo Set',
    image: giftSetImage,
    category: 'Combos',
    inStock: 35,
    benefits: ['Best value combination', 'Boost average order', 'Perfect gift set', 'Cooking + wellness', 'Save ₹99 vs individual'],
    ingredients: 'Pahadi Desi Ghee (500g) + Himalayan Wildflower Honey (500g)',
    usage: 'Use ghee for cooking and honey for daily wellness. Perfect for traditional Indian cuisine and Ayurvedic practices.',
    variants: null,
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
    category: 'Pulses & Grains',
    inStock: 72,
    benefits: ['High in plant protein', 'Rich in dietary fiber', 'Good for digestion', 'Heart-healthy legume', 'Sustainable farming'],
    ingredients: '100% Organic Pahadi Rajma (Kidney Beans) from mountain farms, naturally dried',
    usage: 'Soak overnight, boil for 20-30 minutes. Perfect for traditional Indian dal, rajma rice, or mixed vegetable curries. Use in soups and salads.',
    variants: null,
  },
  {
    id: '10',
    name: 'Pahadi Buransh Juice',
    slug: 'pahadi-buransh-juice',
    tagline: 'Pure organic mountain flower juice with incredible health benefits',
    description: 'Premium organic Buransh (Rhododendron) juice freshly extracted from high-altitude Himalayan mountains. Buransh is a medicinal flower known for its anti-inflammatory, antimicrobial, and immune-boosting properties. Pure, natural, and never concentrated.',
    price: '599.00',
    weight: '250ml',
    image: buranshImage,
    category: 'Liquids & Beverages',
    inStock: 38,
    benefits: ['Powerful anti-inflammatory', 'Boosts immunity naturally', 'Aids respiratory health', 'Rich in antioxidants', 'Traditional Himalayan remedy', 'Detoxifying properties'],
    ingredients: '100% Pure Organic Buransh (Rhododendron) Flower Juice from high-altitude Himalayan mountains, no preservatives or added sugars',
    usage: 'Take 30-50ml daily, diluted with water or consume directly. Can be taken in morning on empty stomach for best results. Perfect for boosting immunity during changing seasons. Shake well before use.',
    variants: null,
  },
  {
    id: '11',
    name: 'All Products Wellness Combo',
    slug: 'all-products-combo',
    tagline: 'Complete Himalayan wellness collection - Limited Time',
    description: 'The ultimate premium combo featuring 3 bestsellers: Pahadi Desi Ghee (500g), Himalayan Wildflower Honey (500g), and Pahadi Buransh Juice (250ml). Experience complete Himalayan wellness.',
    price: '1699.00',
    weight: 'Premium Set',
    image: giftSetImage,
    category: 'Corporate Gifting',
    inStock: 20,
    benefits: ['Complete wellness package', 'Premium gift option', 'Perfect for offices', 'Save ₹198 vs individual', 'Beautiful packaging'],
    ingredients: 'Ghee 500g + Honey 500g + Buransh Juice 250ml',
    usage: 'Premium gift combo. Each product comes with detailed usage instructions. Ideal for corporate gifting and premium wellness enthusiasts.',
    variants: null,
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

import { useState } from 'react';
import { useLocation } from 'wouter';
import { Minus, Plus, Heart, Share2, Truck, Shield, Leaf, Award, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import TestimonialCard from '@/components/TestimonialCard';
import type { Product } from '@shared/schema';

// TODO: remove mock - Import images
import honeyImage from '@assets/generated_images/himalayan_wildflower_honey_product.png';
import gheeImage from '@assets/generated_images/pahadi_desi_ghee_product.png';
import teaImage from '@assets/generated_images/himalayan_herbal_tea_blend.png';
import oilImage from '@assets/generated_images/cold-pressed_walnut_oil_product.png';
import farmerImage from '@assets/generated_images/honey_sourcing_farmer_photo.png';

// TODO: remove mock - Sample product data (would come from API/route params in real app)
const mockProduct: Product = {
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
  benefits: [
    'Rich in antioxidants that support cellular health',
    'Natural energy boost without sugar crash',
    'Supports immunity with enzymes and minerals',
    'Anti-inflammatory properties',
    'Aids digestion and gut health',
  ],
  ingredients: '100% Pure Raw Wildflower Honey from Himalayan flora including rhododendron, wild roses, and mountain herbs',
  usage: 'Take 1-2 teaspoons daily on empty stomach or add to warm (not hot) beverages. Perfect as a natural sweetener in tea, smoothies, or drizzled over yogurt.',
};

// TODO: remove mock - Related products
const relatedProducts: Product[] = [
  {
    id: '2',
    name: 'Pahadi Desi Ghee',
    slug: 'pahadi-desi-ghee',
    tagline: 'Grass-fed, small batch',
    description: 'Traditional ghee',
    price: '799.00',
    weight: '500g',
    image: gheeImage,
    category: 'featured',
    inStock: 28,
    benefits: [],
    ingredients: 'Pure A2 milk',
    usage: 'Cooking',
  },
  {
    id: '3',
    name: 'Himalayan Herbal Tea',
    slug: 'himalayan-herbal-tea',
    tagline: 'Immunity-boosting blend',
    description: 'Herbal tea',
    price: '349.00',
    weight: '100g',
    image: teaImage,
    category: 'tea',
    inStock: 62,
    benefits: [],
    ingredients: 'Herbs',
    usage: 'Daily',
  },
  {
    id: '4',
    name: 'Cold-Pressed Walnut Oil',
    slug: 'cold-pressed-walnut-oil',
    tagline: 'Rich in Omega-3',
    description: 'Walnut oil',
    price: '699.00',
    weight: '250ml',
    image: oilImage,
    category: 'oil',
    inStock: 35,
    benefits: [],
    ingredients: 'Walnuts',
    usage: 'Cooking',
  },
];

// TODO: remove mock - Reviews
const mockReviews = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    review: 'The honey is absolutely pure and delicious. You can taste the difference in quality. My family loves it!'
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    review: 'Best honey I\'ve had in years. Authentic taste that reminds me of my grandmother\'s raw honey. Worth every rupee.'
  },
  {
    name: 'Anjali Patel',
    location: 'Bangalore, Karnataka',
    rating: 5,
    review: 'Great quality, fast delivery, and the packaging is beautiful. Definitely ordering again!'
  },
];

interface CartItem extends Product {
  quantity: number;
}

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    const cartItem = { ...mockProduct, quantity };
    setCartItems(prev => {
      const existing = prev.find(item => item.id === mockProduct.id);
      if (existing) {
        return prev.map(item =>
          item.id === mockProduct.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, cartItem];
    });
    console.log('Added to cart:', mockProduct.name, 'Qty:', quantity);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Cart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => console.log('Checkout')}
      >
        <div className="hidden" />
      </Cart>

      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => {}}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="bg-muted rounded-lg overflow-hidden mb-6">
              <img 
                src={mockProduct.image}
                alt={mockProduct.name}
                className="w-full h-[500px] object-cover"
                data-testid="img-product-detail"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                data-testid="button-add-to-cart-main"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsWishlisted(!isWishlisted)}
                data-testid="button-wishlist"
                className={isWishlisted ? 'bg-red-50 text-red-600' : ''}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open('https://wa.me/919001949260', '_blank')}
                data-testid="button-share-whatsapp"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 
                    className="font-serif text-4xl font-bold mb-2"
                    data-testid="text-product-name"
                  >
                    {mockProduct.name}
                  </h1>
                  <p 
                    className="text-lg text-muted-foreground"
                    data-testid="text-tagline"
                  >
                    {mockProduct.tagline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold" data-testid="text-price">
                  ₹{mockProduct.price}
                </span>
                <Badge data-testid="badge-in-stock">In Stock</Badge>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <Truck className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">Over ₹999</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold">Lab Tested</p>
                  <p className="text-xs text-muted-foreground">Certified Pure</p>
                </div>
                <div className="text-center">
                  <Leaf className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold">Eco Packaging</p>
                  <p className="text-xs text-muted-foreground">Sustainable</p>
                </div>
                <div className="text-center">
                  <Award className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold">Authentic</p>
                  <p className="text-xs text-muted-foreground">100% Pure</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="font-semibold mb-4">Quantity</p>
                <div className="flex items-center gap-4 w-fit border rounded-lg p-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    data-testid="button-decrease-qty"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold" data-testid="text-quantity">
                    {quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="button-increase-qty"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full mb-3"
                onClick={handleAddToCart}
                data-testid="button-add-to-cart-secondary"
              >
                Add {quantity} to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => window.open('https://wa.me/919001949260', '_blank')}
                data-testid="button-order-whatsapp"
              >
                Order via WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="benefits" className="mb-16">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="sourcing">How It's Sourced</TabsTrigger>
            <TabsTrigger value="usage">Usage & Care</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Benefits Tab */}
          <TabsContent value="benefits" className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-6" data-testid="text-benefits-title">
                Why Choose Our Honey?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mockProduct.benefits.map((benefit, idx) => (
                  <Card key={idx} data-testid={`card-benefit-${idx}`}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground leading-relaxed">{benefit}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h4 className="font-semibold mb-3">Key Nutritional Components</h4>
                <ul className="space-y-2 text-sm">
                  <li data-testid="text-nutrition-1" className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" /> Glucose & Fructose (natural sugars)
                  </li>
                  <li data-testid="text-nutrition-2" className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" /> Polyphenols (powerful antioxidants)
                  </li>
                  <li data-testid="text-nutrition-3" className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" /> Enzymes (amylase, lipase, protease)
                  </li>
                  <li data-testid="text-nutrition-4" className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" /> Trace minerals (zinc, selenium, copper)
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sourcing Tab */}
          <TabsContent value="sourcing" className="space-y-8">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-6" data-testid="text-sourcing-title">
                Our Sourcing Story
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <img 
                    src={farmerImage}
                    alt="Sourcing from Himalayan farmers"
                    className="w-full h-[350px] object-cover rounded-lg mb-4"
                    data-testid="img-sourcing"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-foreground leading-relaxed" data-testid="text-sourcing-story-1">
                    Our honey comes from small-scale beekeepers in remote Himalayan villages, where generations of knowledge meet pristine nature. The bees forage freely on wildflowers blooming at 8,000+ feet elevation, creating honey with a unique flavor and nutritional profile.
                  </p>
                  <p className="text-foreground leading-relaxed" data-testid="text-sourcing-story-2">
                    We work directly with these families, ensuring fair prices that support their sustainable practices. No middlemen, no exploitation—just pure, honest commerce rooted in respect for both people and nature.
                  </p>
                  <p className="text-foreground leading-relaxed" data-testid="text-sourcing-story-3">
                    Every jar is hand-harvested, never heated above hive temperature, and bottled within days. This preserves all the living enzymes and beneficial compounds that make raw honey so remarkable.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card data-testid="card-sourcing-step-1">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-primary">1</span>
                    </div>
                    <h4 className="font-semibold mb-2">Mountain Beehives</h4>
                    <p className="text-sm text-muted-foreground">
                      Sustainable hives at high altitude Himalayan locations
                    </p>
                  </CardContent>
                </Card>

                <Card data-testid="card-sourcing-step-2">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-primary">2</span>
                    </div>
                    <h4 className="font-semibold mb-2">Hand Harvested</h4>
                    <p className="text-sm text-muted-foreground">
                      Careful extraction maintaining raw enzyme content
                    </p>
                  </CardContent>
                </Card>

                <Card data-testid="card-sourcing-step-3">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-primary">3</span>
                    </div>
                    <h4 className="font-semibold mb-2">Lab Tested</h4>
                    <p className="text-sm text-muted-foreground">
                      Every batch certified for purity and authenticity
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-6" data-testid="text-usage-title">
                How to Use & Store
              </h3>
              
              <Card className="mb-6" data-testid="card-usage-guide">
                <CardContent className="p-8">
                  <h4 className="font-semibold text-lg mb-4">Daily Usage</h4>
                  <p className="text-foreground leading-relaxed mb-4">
                    {mockProduct.usage}
                  </p>
                  <h4 className="font-semibold text-lg mb-4 mt-6">Storage Instructions</h4>
                  <ul className="space-y-3">
                    <li data-testid="text-storage-1" className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>Store in a cool, dark place away from direct sunlight</span>
                    </li>
                    <li data-testid="text-storage-2" className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>Room temperature storage is ideal (15-21°C)</span>
                    </li>
                    <li data-testid="text-storage-3" className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>Never refrigerate raw honey—it crystallizes and loses potency</span>
                    </li>
                    <li data-testid="text-storage-4" className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>If crystallization occurs, gently warm the jar in warm water</span>
                    </li>
                    <li data-testid="text-storage-5" className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>Shelf life: 2+ years when stored properly</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border-amber-200" data-testid="card-authenticity-tip">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">How to Spot Authentic Raw Honey</h4>
                  <ul className="space-y-2 text-sm">
                    <li data-testid="text-authentic-1" className="flex gap-2">
                      <span>✓</span>
                      <span>Crystallization is natural and indicates purity</span>
                    </li>
                    <li data-testid="text-authentic-2" className="flex gap-2">
                      <span>✓</span>
                      <span>Rich, complex flavor profile with subtle floral notes</span>
                    </li>
                    <li data-testid="text-authentic-3" className="flex gap-2">
                      <span>✓</span>
                      <span>Slightly thick consistency that flows slowly</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-6" data-testid="text-faq-title">
                Frequently Asked Questions
              </h3>
              
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="q1" className="border rounded-lg px-4" data-testid="accordion-q1">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left">Is this honey truly raw and unprocessed?</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, our honey is 100% raw and unprocessed. It is never heated above hive temperature, never filtered or pasteurized. This preserves all the living enzymes, beneficial bacteria, and nutrients that make raw honey so special.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q2" className="border rounded-lg px-4" data-testid="accordion-q2">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left">Why does my honey crystallize and is it still good?</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Crystallization is a natural process that proves authenticity. Raw honey with natural sugars will crystallize over time. Simply place the jar in warm water to return it to liquid form. The honey is still perfectly safe and nutritious.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q3" className="border rounded-lg px-4" data-testid="accordion-q3">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left">How do I know if the honey is authentic?</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Authentic raw honey has several qualities: it crystallizes naturally, has a complex floral flavor, flows slowly, and may contain pollen or other particles. Our honey is lab-tested and certified. We provide transparent sourcing and farmer stories with every purchase.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q4" className="border rounded-lg px-4" data-testid="accordion-q4">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left">Can I give raw honey to children?</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Raw honey is not recommended for children under 1 year due to the risk of botulism. For children over 1 year and adults, our raw honey is safe and provides excellent nutritional benefits. Always consult your pediatrician for specific dietary advice.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q5" className="border rounded-lg px-4" data-testid="accordion-q5">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left">How long does the honey last?</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    When stored properly in a cool, dark place, our raw honey has a shelf life of 2+ years. Honey's natural antibacterial properties make it exceptionally stable. Some studies show honey can last indefinitely when stored correctly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q6" className="border rounded-lg px-4" data-testid="accordion-q6">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left">What if I'm not satisfied with the product?</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    We stand behind our products with a 100% satisfaction guarantee. If you're not completely satisfied, contact us within 30 days for a full refund or replacement. No questions asked. Your trust is our priority.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q7" className="border rounded-lg px-4" data-testid="accordion-q7">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left">Is your packaging eco-friendly?</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes! Our jars are made from recyclable glass and our packaging uses biodegradable materials. We're committed to minimizing our environmental impact while ensuring your honey arrives fresh and pure.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q8" className="border rounded-lg px-4" data-testid="accordion-q8">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left">Do you ship internationally?</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Currently we ship across India with careful temperature control. For international orders, please contact us via WhatsApp at +91 90019 49260 to discuss options and shipping rates.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-6" data-testid="text-reviews-title">
                Customer Reviews
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {mockReviews.map((review, idx) => (
                  <TestimonialCard key={idx} {...review} />
                ))}
              </div>

              <Card className="bg-muted/50">
                <CardContent className="p-8">
                  <h4 className="font-semibold mb-4">Share Your Experience</h4>
                  <p className="text-muted-foreground mb-4">
                    Have you tried our honey? We'd love to hear from you!
                  </p>
                  <Button 
                    variant="default"
                    onClick={() => window.open('https://wa.me/919001949260', '_blank')}
                    data-testid="button-write-review"
                  >
                    Send Feedback via WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section className="mb-20">
          <h3 className="font-serif text-2xl font-bold mb-8" data-testid="text-related-title">
            You Might Also Like
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(p) => {
                  const cartItem = { ...p, quantity: 1 };
                  setCartItems(prev => [...prev, cartItem]);
                }}
                onViewDetails={(p) => console.log('View:', p.name)}
              />
            ))}
          </div>
        </section>

        {/* Premium Assurance Section */}
        <section className="bg-primary/5 rounded-lg p-8 md:p-12 mb-12">
          <h3 className="font-serif text-2xl font-bold mb-6" data-testid="text-assurance-title">
            Our Premium Promise
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div data-testid="card-assurance-1">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                100% Purity Guarantee
              </h4>
              <p className="text-muted-foreground">
                Every batch is lab-tested for authenticity, purity, and absence of additives or adulteration.
              </p>
            </div>
            <div data-testid="card-assurance-2">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                Ethical Sourcing
              </h4>
              <p className="text-muted-foreground">
                Fair-trade practices ensure farmers are paid fairly while preserving mountain ecosystems.
              </p>
            </div>
            <div data-testid="card-assurance-3">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Quality Certified
              </h4>
              <p className="text-muted-foreground">
                Meet international standards for raw honey quality and nutritional content.
              </p>
            </div>
            <div data-testid="card-assurance-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Carefully Packaged
              </h4>
              <p className="text-muted-foreground">
                Shipped in eco-friendly, temperature-controlled packaging to reach you fresh and pure.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

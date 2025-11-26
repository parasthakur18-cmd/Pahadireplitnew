import { type User, type InsertUser, type CartItem, type InsertCartItem, type Product, type Review, type InsertReview, type Wishlist, type InsertWishlist } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addCartItem(item: InsertCartItem): Promise<CartItem>;
  removeCartItem(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getAllProducts(): Promise<Product[]>;
  addProduct(product: Product): Promise<Product>;
  updateProduct(id: string, product: Partial<Product>): Promise<Product | undefined>;
  getReviews(productId: string): Promise<Review[]>;
  addReview(review: InsertReview): Promise<Review>;
  getWishlistItems(sessionId: string): Promise<Wishlist[]>;
  addToWishlist(wishlist: InsertWishlist): Promise<Wishlist>;
  removeFromWishlist(id: string): Promise<void>;
  isInWishlist(productId: string, sessionId: string): Promise<boolean>;
  getAnalytics(): Promise<{ totalRevenue: number; totalOrders: number; totalCost: number }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private cartItems: Map<string, CartItem>;
  private products: Map<string, Product>;
  private reviews: Map<string, Review>;
  private wishlists: Map<string, Wishlist>;
  private cartCounter = 0;
  private orders: Map<string, { id: string; productId: string; quantity: number; totalPrice: number; timestamp: number }> = new Map();

  constructor() {
    this.users = new Map();
    this.cartItems = new Map();
    this.products = new Map();
    this.reviews = new Map();
    this.wishlists = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    const defaultProducts: Product[] = [
      {
        id: "1",
        name: "Himalayan Wildflower Honey",
        slug: "himalayan-wildflower-honey",
        tagline: "Raw, unprocessed nectar from mountain blooms",
        description: "Pure wildflower honey harvested from pristine Himalayan valleys at 8,000+ feet. Rich in antioxidants, enzymes, and natural minerals. Never heated, never filtered.",
        price: "599.00",
        weight: "500g",
        image: "/generated_images/himalayan_wildflower_honey_product.png",
        category: "featured",
        inStock: 45,
        benefits: ["Rich in antioxidants", "Natural energy boost", "Supports immunity", "Anti-inflammatory properties", "Aids digestion"],
        ingredients: "100% Pure Raw Wildflower Honey from Himalayan flora including rhododendron, wild roses, and mountain herbs",
        usage: "Take 1-2 teaspoons daily on empty stomach or add to warm (not hot) beverages. Perfect as a natural sweetener in tea, smoothies, or drizzled over yogurt.",
        variants: null
      },
      {
        id: "2",
        name: "Pahadi Desi Ghee",
        slug: "pahadi-desi-ghee",
        tagline: "Grass-fed, small batch artisanal ghee",
        description: "Traditional A2 ghee from indigenous Pahadi cows grazing freely on mountain pastures. Hand-churned using the ancient bilona method for superior taste and nutrition.",
        price: "799.00",
        weight: "500g",
        image: "/generated_images/pahadi_desi_ghee_product.png",
        category: "featured",
        inStock: 28,
        benefits: ["Rich in A2 protein", "High smoke point for cooking", "Supports brain health", "Rich in vitamins A, D, E, K", "Improves digestion"],
        ingredients: "Pure A2 milk from grass-fed Pahadi cows, cultured using traditional dahi method and hand-churned",
        usage: "Use for high-heat cooking, add to dal, rice, or rotis. Take 1 teaspoon on empty stomach for digestive health. Perfect for Ayurvedic practices.",
        variants: null
      },
      {
        id: "3",
        name: "Himalayan Herbal Tea Blend",
        slug: "himalayan-herbal-tea",
        tagline: "Immunity-boosting mountain herbs blend",
        description: "Carefully curated blend of wild Himalayan herbs including tulsi, lemongrass, ginger, and mountain mint. Naturally caffeine-free and packed with antioxidants.",
        price: "349.00",
        weight: "100g",
        image: "/generated_images/himalayan_herbal_tea_blend.png",
        category: "tea",
        inStock: 62,
        benefits: ["Boosts immunity", "Reduces stress and anxiety", "Aids respiratory health", "Rich in antioxidants", "Caffeine-free energy"],
        ingredients: "Organic Tulsi, Himalayan Lemongrass, Fresh Ginger, Wild Mountain Mint, Licorice Root, hand-picked at peak freshness",
        usage: "Steep 1 teaspoon in hot water for 5-7 minutes. Enjoy 2-3 cups daily. Can be had with honey or as is. Perfect morning or evening ritual.",
        variants: null
      },
      {
        id: "4",
        name: "Cold-Pressed Walnut Oil",
        slug: "cold-pressed-walnut-oil",
        tagline: "First cold press, nutrient-rich",
        description: "Premium walnut oil extracted from hand-cracked Himalayan walnuts using traditional wooden presses. Rich in Omega-3 fatty acids and vitamin E.",
        price: "699.00",
        weight: "250ml",
        image: "/generated_images/cold-pressed_walnut_oil_product.png",
        category: "oil",
        inStock: 35,
        benefits: ["Rich in Omega-3", "Supports heart health", "Anti-inflammatory", "Good for skin and hair", "Brain health"],
        ingredients: "100% Pure Cold-Pressed Himalayan Walnuts (Juglans regia), single origin, first press only",
        usage: "Drizzle over salads, use in dressings, or add to smoothies. Not for high-heat cooking. Can be applied topically for hair and skin nourishment.",
        variants: null
      },
      {
        id: "5",
        name: "Organic Amla Powder",
        slug: "organic-amla-powder",
        tagline: "Sun-dried Indian gooseberry superfood",
        description: "Pure amla powder from wild Himalayan gooseberries, sun-dried and stone-ground to preserve vitamin C and natural nutrients.",
        price: "299.00",
        weight: "200g",
        image: "/generated_images/organic_amla_powder_product.png",
        category: "wellness",
        inStock: 58,
        benefits: ["Highest natural vitamin C", "Boosts immunity", "Promotes hair growth", "Improves digestion", "Antioxidant powerhouse"],
        ingredients: "100% Organic Wild Amla (Emblica officinalis), sun-dried and stone-ground, no additives",
        usage: "Mix 1 teaspoon with water, juice, or honey daily. Can be used in hair masks or face packs. Best taken on empty stomach.",
        variants: null
      },
      {
        id: "6",
        name: "Himalayan Pink Salt",
        slug: "himalayan-pink-salt",
        tagline: "Coarse, mineral-rich ancient salt",
        description: "Authentic pink salt harvested from ancient Himalayan deposits. Contains 84 trace minerals and elements naturally occurring in the human body.",
        price: "249.00",
        weight: "1kg",
        image: "/generated_images/himalayan_pink_salt_product.png",
        category: "pantry",
        inStock: 92,
        benefits: ["84 trace minerals", "Supports electrolyte balance", "Aids hydration", "Natural detoxifier", "Better than table salt"],
        ingredients: "100% Pure Himalayan Pink Rock Salt (Halite) from Khewra mines, unrefined and unprocessed",
        usage: "Use as regular cooking salt or for salt water therapy. Grind fresh for maximum flavor. Ideal for salt lamps and baths.",
        variants: null
      },
      {
        id: "7",
        name: "Shilajit Resin",
        slug: "shilajit-resin",
        tagline: "Purified Himalayan mineral resin",
        description: "Authentic shilajit resin sourced from high-altitude Himalayan rocks. Lab-tested for purity, rich in fulvic acid and over 85 minerals.",
        price: "1299.00",
        weight: "20g",
        image: "/generated_images/shilajit_resin_purified_product.png",
        category: "wellness",
        inStock: 18,
        benefits: ["Boosts energy and stamina", "Supports testosterone", "Enhances cognitive function", "Anti-aging properties", "Improves nutrient absorption"],
        ingredients: "Pure Himalayan Shilajit Resin (Asphaltum punjabianum), purified through traditional filtration, lab-tested for heavy metals",
        usage: "Dissolve a pea-sized portion in warm water or milk. Take once daily, preferably in morning. Start with smaller dose and increase gradually.",
        variants: null
      },
      {
        id: "8",
        name: "Mountain Honey & Herb Gift Set",
        slug: "gift-set",
        tagline: "Curated wellness gift collection",
        description: "Thoughtfully curated gift set featuring our bestsellers: Wildflower Honey (250g), Herbal Tea (50g), and Amla Powder (100g) in beautiful eco-friendly packaging.",
        price: "999.00",
        weight: "Gift Set",
        image: "/generated_images/premium_himalayan_wellness_combo_gift_set.png",
        category: "featured",
        inStock: 24,
        benefits: ["Perfect gift option", "Eco-friendly packaging", "Bestseller collection", "Wellness starter pack", "Beautiful presentation"],
        ingredients: "Includes: Wildflower Honey 250g, Herbal Tea Blend 50g, Organic Amla Powder 100g, packaged with care",
        usage: "A perfect introduction to Himalayan wellness. Each item has individual usage instructions. Makes an ideal gift for health-conscious loved ones.",
        variants: null
      },
      {
        id: "9",
        name: "Ghee & Honey Premium Combo",
        slug: "ghee-honey-combo",
        tagline: "Golden duo of Himalayan wellness",
        description: "Perfect pairing of pure A2 Desi Ghee (500g) and raw Wildflower Honey (500g). This combo delivers complete nutritional synergy - ghee for cooking excellence and honey for natural energy. Lab-tested, pure, and authentic.",
        price: "1299.00",
        weight: "Combo Pack",
        image: "/generated_images/ghee_and_honey_premium_combo.png",
        category: "combos",
        inStock: 32,
        benefits: ["Complete wellness duo", "Perfect for cooking & health", "Lab-tested purity", "Premium packaging", "Great value combo"],
        ingredients: "Pure A2 Desi Ghee (500g) + Raw Wildflower Honey (500g)",
        usage: "Use ghee for high-heat cooking, add to rotis, dal or rice. Take honey daily with warm water for immunity. Perfect morning wellness ritual.",
        variants: null
      },
      {
        id: "10",
        name: "Complete Himalayan Wellness Combo",
        slug: "complete-wellness-combo",
        tagline: "7-product ultimate wellness collection",
        description: "Our most comprehensive wellness collection featuring Wildflower Honey, Desi Ghee, Herbal Tea, Walnut Oil, Amla Powder, Pink Salt, and Shilajit. Everything you need for complete family wellness in one beautiful gift box.",
        price: "4499.00",
        weight: "Combo Pack",
        image: "/generated_images/all_products_himalayan_wellness_combo.png",
        category: "combos",
        inStock: 15,
        benefits: ["7 premium products", "Complete wellness solution", "Perfect gift set", "Luxury packaging", "Save ₹700+ vs individual purchases"],
        ingredients: "Includes: Honey 500g, Ghee 500g, Herbal Tea 100g, Walnut Oil 250ml, Amla Powder 200g, Pink Salt 500g, Shilajit 10g",
        usage: "A complete Himalayan wellness starter pack. Each product can be used independently for targeted health benefits or together as a holistic wellness routine.",
        variants: null
      }
    ];

    defaultProducts.forEach(p => this.products.set(p.id, p));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }

  async addCartItem(item: InsertCartItem): Promise<CartItem> {
    const existingItem = Array.from(this.cartItems.values()).find(
      (ci) => ci.productId === item.productId && ci.sessionId === item.sessionId
    );
    
    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
      return existingItem;
    }

    const id = randomUUID();
    const cartItem: CartItem = { id, ...item, quantity: item.quantity || 1 };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async removeCartItem(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    Array.from(this.cartItems.entries()).forEach(([key, item]) => {
      if (item.sessionId === sessionId) {
        this.cartItems.delete(key);
      }
    });
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(p => p.slug === slug);
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async addProduct(product: Product): Promise<Product> {
    this.products.set(product.id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.products.set(id, updated);
    return updated;
  }

  async getReviews(productId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(r => r.productId === productId);
  }

  async addReview(review: InsertReview): Promise<Review> {
    const id = randomUUID();
    const newReview: Review = { id, ...review };
    this.reviews.set(id, newReview);
    return newReview;
  }

  async getWishlistItems(sessionId: string): Promise<Wishlist[]> {
    return Array.from(this.wishlists.values()).filter(w => w.sessionId === sessionId);
  }

  async addToWishlist(wishlist: InsertWishlist): Promise<Wishlist> {
    const existing = Array.from(this.wishlists.values()).find(
      w => w.productId === wishlist.productId && w.sessionId === wishlist.sessionId
    );
    if (existing) return existing;
    
    const id = randomUUID();
    const newWishlist: Wishlist = { id, ...wishlist };
    this.wishlists.set(id, newWishlist);
    return newWishlist;
  }

  async removeFromWishlist(id: string): Promise<void> {
    this.wishlists.delete(id);
  }

  async isInWishlist(productId: string, sessionId: string): Promise<boolean> {
    return Array.from(this.wishlists.values()).some(
      w => w.productId === productId && w.sessionId === sessionId
    );
  }

  async getAnalytics(): Promise<{ totalRevenue: number; totalOrders: number; totalCost: number }> {
    let totalRevenue = 0;
    let totalOrders = 0;
    let totalCost = 0;

    Array.from(this.orders.values()).forEach(order => {
      totalRevenue += order.totalPrice;
      totalOrders += 1;
      totalCost += order.totalPrice * 0.4;
    });

    return { totalRevenue, totalOrders, totalCost };
  }
}

export const storage = new MemStorage();

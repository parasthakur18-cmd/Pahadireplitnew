import { type User, type InsertUser, type CartItem, type InsertCartItem, type Product } from "@shared/schema";
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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private cartItems: Map<string, CartItem>;
  private products: Map<string, Product>;
  private cartCounter = 0;

  constructor() {
    this.users = new Map();
    this.cartItems = new Map();
    this.products = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    const defaultProducts: Product[] = [
      {
        id: "1",
        name: "Himalayan Raw Honey",
        slug: "himalayan-raw-honey",
        tagline: "Pure, unprocessed mountain nectar",
        description: "Straight from the beehives of the Himalayan foothills",
        price: "599",
        weight: "500g",
        image: "/api/placeholder/honey",
        category: "Honey",
        inStock: 1,
        benefits: ["Rich in antioxidants", "Boosts immunity", "Natural energy"],
        ingredients: "100% Pure Himalayan Honey",
        usage: "Consume 1-2 tablespoons daily"
      },
      {
        id: "2",
        name: "Organic Ghee",
        slug: "organic-ghee",
        tagline: "Golden, clarified butter",
        description: "Traditional grass-fed ghee from mountain cows",
        price: "799",
        weight: "500ml",
        image: "/api/placeholder/ghee",
        category: "Ghee",
        inStock: 1,
        benefits: ["High in healthy fats", "Improves digestion", "Anti-inflammatory"],
        ingredients: "100% Cow Ghee",
        usage: "Use for cooking or consume 1 teaspoon daily"
      },
      {
        id: "3",
        name: "Herbal Tea Blend",
        slug: "herbal-tea-blend",
        tagline: "Wellness in every cup",
        description: "Blend of 7 Himalayan herbs for perfect health",
        price: "399",
        weight: "100g",
        image: "/api/placeholder/tea",
        category: "Tea",
        inStock: 1,
        benefits: ["Detoxifies body", "Relaxes mind", "Boosts metabolism"],
        ingredients: "Turmeric, Ginger, Ashwagandha, Tulsi, Cardamom, Cinnamon, Cloves",
        usage: "Brew 1 teaspoon in hot water for 5 minutes"
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
      existingItem.quantity += item.quantity;
      return existingItem;
    }

    const id = randomUUID();
    const cartItem: CartItem = { ...item, id };
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
}

export const storage = new MemStorage();

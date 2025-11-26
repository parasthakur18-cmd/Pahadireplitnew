import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertReviewSchema, insertWishlistSchema, insertOrderSchema } from "@shared/schema";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Sitemap endpoint for Google SEO
  app.get("/sitemap.xml", async (req, res) => {
    const products = await storage.getAllProducts();
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
    
    // Home page
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>1.0</priority>\n';
    xml += '  </url>\n';
    
    // Products listing page
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/products</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += '    <changefreq>daily</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
    
    // Individual product pages
    products.forEach(product => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/product/${product.slug}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      if (product.image) {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${product.image}</image:loc>\n`;
        xml += `      <image:title>${product.name}</image:title>\n`;
        xml += '    </image:image>\n';
      }
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    res.type('application/xml').send(xml);
  });

  // Robots.txt
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `User-agent: *
Allow: /
Allow: /products
Allow: /product/
Disallow: /admin
Disallow: /cart
Sitemap: ${req.protocol}://${req.get('host')}/sitemap.xml

User-agent: Googlebot
Allow: /
Priority: 0.9

User-agent: Bingbot
Allow: /
Priority: 0.8`;
    res.type('text/plain').send(robotsTxt);
  });

  app.get("/api/products", async (req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });

  app.get("/api/products/:slug", async (req, res) => {
    const product = await storage.getProductBySlug(req.params.slug);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  });

  app.patch("/api/products/:id", async (req, res) => {
    const product = await storage.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  });

  app.post("/api/products", async (req, res) => {
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: req.body.name || "New Product",
      slug: req.body.slug || req.body.name?.toLowerCase().replace(/\s+/g, "-") || "new-product",
      tagline: req.body.tagline || "Product description",
      description: req.body.description || "",
      price: req.body.price || "0",
      weight: req.body.weight || "0g",
      image: req.body.image || "/generated_images/placeholder.png",
      category: req.body.category || "general",
      inStock: req.body.inStock || 0,
      benefits: req.body.benefits || [],
      ingredients: req.body.ingredients || "N/A",
      usage: req.body.usage || "N/A",
      variants: req.body.variants || null,
    };
    const product = await storage.addProduct(newProduct);
    res.json(product);
  });

  app.delete("/api/products/:id", async (req, res) => {
    const success = await storage.deleteProduct(req.params.id);
    if (!success) return res.status(404).json({ error: "Product not found" });
    res.json({ success: true });
  });

  app.get("/api/cart/:sessionId", async (req, res) => {
    const cartItems = await storage.getCartItems(req.params.sessionId);
    const itemsWithProducts = await Promise.all(
      cartItems.map(async (item) => {
        const product = await storage.getProduct(item.productId);
        return { ...item, product };
      })
    );
    res.json(itemsWithProducts);
  });

  app.post("/api/cart/add", async (req, res) => {
    const result = insertCartItemSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error });
    const cartItem = await storage.addCartItem(result.data);
    res.json(cartItem);
  });

  app.delete("/api/cart/:id", async (req, res) => {
    await storage.removeCartItem(req.params.id);
    res.json({ success: true });
  });

  app.post("/api/cart/:sessionId/clear", async (req, res) => {
    await storage.clearCart(req.params.sessionId);
    res.json({ success: true });
  });

  // Reviews API
  app.get("/api/reviews/:productId", async (req, res) => {
    const reviews = await storage.getReviews(req.params.productId);
    res.json(reviews);
  });

  app.post("/api/reviews", async (req, res) => {
    const result = insertReviewSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error });
    const review = await storage.addReview(result.data);
    res.json(review);
  });

  // Wishlist API
  app.get("/api/wishlist/:sessionId", async (req, res) => {
    const items = await storage.getWishlistItems(req.params.sessionId);
    const itemsWithProducts = await Promise.all(
      items.map(async (item) => {
        const product = await storage.getProduct(item.productId);
        return { ...item, product };
      })
    );
    res.json(itemsWithProducts);
  });

  app.post("/api/wishlist/add", async (req, res) => {
    const result = insertWishlistSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error });
    const wishlist = await storage.addToWishlist(result.data);
    res.json(wishlist);
  });

  app.delete("/api/wishlist/:id", async (req, res) => {
    await storage.removeFromWishlist(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/wishlist/check/:productId/:sessionId", async (req, res) => {
    const inWishlist = await storage.isInWishlist(req.params.productId, req.params.sessionId);
    res.json({ inWishlist });
  });

  // Analytics API
  app.get("/api/analytics", async (req, res) => {
    const analytics = await storage.getAnalytics();
    res.json(analytics);
  });

  // Orders API
  app.get("/api/orders", async (req, res) => {
    const orders = await storage.getAllOrders();
    res.json(orders);
  });

  app.get("/api/orders/:id", async (req, res) => {
    const order = await storage.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  });

  app.post("/api/orders", async (req, res) => {
    const result = insertOrderSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error });
    const order = await storage.createOrder(result.data);
    res.json(order);
  });

  app.patch("/api/orders/:id", async (req, res) => {
    const order = await storage.updateOrderStatus(req.params.id, req.body.status);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  });

  // Razorpay order creation endpoint
  app.post("/api/razorpay/order", async (req, res) => {
    try {
      const { amount, sessionId } = req.body;
      if (!amount || !sessionId) {
        return res.status(400).json({ error: "Missing amount or sessionId" });
      }
      const order = await razorpay.orders.create({
        amount: Math.round(amount),
        currency: "INR",
        receipt: sessionId,
      });
      res.json(order);
    } catch (error) {
      console.error("Razorpay error:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/products", async (req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });

  app.get("/api/products/:slug", async (req, res) => {
    const product = await storage.getProductBySlug(req.params.slug);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
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

  const httpServer = createServer(app);
  return httpServer;
}

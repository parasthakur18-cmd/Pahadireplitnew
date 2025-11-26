import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSEOMeta } from "@/components/SEOMeta";
import logoImage from "@assets/image_1764118320577.png";
import type { CartItem, Product } from "@shared/schema";

interface CartItemWithProduct extends CartItem {
  product?: Product;
}

export default function Cart() {
  const [sessionId, setSessionId] = useState(() => {
    const id = typeof window !== 'undefined' ? (localStorage.getItem("sessionId") || crypto.randomUUID()) : crypto.randomUUID();
    if (typeof window !== 'undefined') {
      localStorage.setItem("sessionId", id);
    }
    return id;
  });

  const { data: cartItems = [], refetch } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart", sessionId],
    queryFn: () => fetch(`/api/cart/${sessionId}`).then(r => r.json()),
    enabled: !!sessionId,
  });

  const removeItem = async (id: string) => {
    const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
    if (res.ok) {
      refetch();
    }
  };

  const checkout = () => {
    if (!cartItems.length) return;

    const items = cartItems as CartItemWithProduct[];
    const itemsList = items
      .map(item => `${item.product?.name || 'Product'} (${item.quantity}x ₹${item.product?.price || 0})`)
      .join("\n");
    
    const total = items.reduce((sum, item) => {
      const price = parseFloat(item.product?.price || "0");
      return sum + (price * item.quantity);
    }, 0);

    const message = `Hi! I'd like to order:\n\n${itemsList}\n\nTotal: ₹${total.toFixed(2)}\n\nPlease confirm availability and delivery details.`;
    const whatsappUrl = `https://wa.me/919001949260?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const total = (cartItems as CartItemWithProduct[]).reduce((sum, item) => {
    const price = parseFloat(item.product?.price || "0");
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cartItemCount={cartItems.length} onCartClick={() => {}} />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <img src={logoImage} alt="The Pahadi Company" className="w-20 h-20 rounded-full mx-auto mb-6 object-cover" data-testid="img-logo-cart" />
                <p className="text-lg text-muted-foreground mb-6">Your cart is empty</p>
                <Button className="bg-orange-700 hover:bg-orange-800 text-white">
                  <a href="/products">Continue Shopping</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {(cartItems as CartItemWithProduct[]).map(item => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-serif text-lg font-bold text-gray-900">{item.product?.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.product?.weight}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-orange-700">₹{item.product?.price}</span>
                            <span className="text-gray-600">Qty: {item.quantity}</span>
                            <span className="text-lg font-semibold">₹{(parseFloat(item.product?.price || "0") * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          data-testid={`button-remove-${item.id}`}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-orange-50 border-orange-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-semibold text-gray-900">Order Total:</span>
                  <span className="text-3xl font-bold text-orange-700">₹{total.toFixed(2)}</span>
                </div>
                <Button
                  onClick={checkout}
                  data-testid="button-checkout-whatsapp"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Complete Order on WhatsApp
                </Button>
                <p className="text-xs text-gray-600 text-center mt-4">
                  You'll be redirected to WhatsApp to confirm your order
                </p>
              </Card>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

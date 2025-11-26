import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Phone, CreditCard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSEOMeta } from "@/components/SEOMeta";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@assets/image_1764118320577.png";
import type { CartItem, Product } from "@shared/schema";

interface CartItemWithProduct extends CartItem {
  product?: Product;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Cart() {
  const { toast } = useToast();
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

  const handleRazorpayCheckout = async () => {
    if (!cartItems.length) return;

    try {
      // Check if Razorpay script is loaded
      if (!window.Razorpay) {
        toast({ title: 'Loading payment gateway...', description: 'Please try again in a moment' });
        return;
      }

      const items = cartItems as CartItemWithProduct[];
      const totalAmount = items.reduce((sum, item) => {
        const price = parseFloat(item.product?.price || "0");
        return sum + (price * item.quantity);
      }, 0);

      const response = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(totalAmount * 100),
          sessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }
      
      const order = await response.json();
      
      if (!order.id) {
        throw new Error('Invalid order response from server');
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_RkGgLu6G2vIeKr',
        amount: order.amount,
        currency: 'INR',
        name: 'The पहाड़ी Company',
        description: 'Order from The Pahadi Company',
        order_id: order.id,
        handler: async (response: any) => {
          toast({ title: 'Payment Successful!', description: 'Your order has been placed.' });
          const cartId = localStorage.getItem('sessionId');
          if (cartId) {
            await fetch(`/api/cart/${cartId}/clear`, { method: 'POST' });
          }
          localStorage.removeItem('sessionId');
          setTimeout(() => window.location.href = '/', 2000);
        },
        prefill: { contact: '9001949260' },
        modal: { ondismiss: () => { console.log('Payment cancelled'); } }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Razorpay error:', error);
      toast({ 
        title: 'Error', 
        description: error instanceof Error ? error.message : 'Failed to process payment', 
        variant: 'destructive' 
      });
    }
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
                <div className="space-y-3">
                  <Button
                    onClick={handleRazorpayCheckout}
                    data-testid="button-checkout-razorpay"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Pay with Razorpay
                  </Button>
                  <Button
                    onClick={checkout}
                    variant="outline"
                    data-testid="button-checkout-whatsapp"
                    className="w-full py-3 text-lg font-semibold gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Order via WhatsApp
                  </Button>
                </div>
                <p className="text-xs text-gray-600 text-center mt-4">
                  Choose your preferred payment method
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

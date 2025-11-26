import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Phone, CreditCard, Plus, Minus, Truck, Shield, Leaf, Award } from "lucide-react";
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

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const removeItem = async (id: string) => {
    const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
    if (res.ok) {
      refetch();
    }
  };

  const applyDiscount = () => {
    // Simple discount codes for demo
    const discounts: Record<string, number> = {
      'SAVE10': 10,
      'PAHADI20': 20,
      'WELCOME15': 15,
    };
    
    const discount = discounts[discountCode.toUpperCase()];
    if (discount) {
      setAppliedDiscount(discount);
      toast({ title: `${discount}% discount applied!` });
      setDiscountCode("");
    } else {
      toast({ title: 'Invalid discount code', variant: 'destructive' });
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

  const subtotal = (cartItems as CartItemWithProduct[]).reduce((sum, item) => {
    const price = parseFloat(item.product?.price || "0");
    return sum + (price * item.quantity);
  }, 0);

  const shippingCost = subtotal > 999 ? 0 : 100;
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const tax = Math.round((subtotal - discountAmount) * 0.05 * 100) / 100; // 5% GST
  const total = subtotal - discountAmount + shippingCost + tax;

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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {(cartItems as CartItemWithProduct[]).map(item => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                            <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="font-serif text-lg font-bold text-gray-900">{item.product?.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{item.product?.weight}</p>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.product?.tagline}</p>
                            
                            <div className="flex items-center gap-4">
                              <span className="text-xl font-bold text-orange-700">₹{item.product?.price}</span>
                              <span className="text-sm line-through text-gray-400">₹{(parseFloat(item.product?.price || "0") * 1.1).toFixed(2)}</span>
                            </div>
                          </div>

                          {/* Quantity & Remove */}
                          <div className="flex flex-col items-end gap-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              data-testid={`button-remove-${item.id}`}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              <p className="text-lg font-semibold text-gray-900">₹{(parseFloat(item.product?.price || "0") * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Trust Badges */}
                  <Card className="bg-green-50 border-green-200 p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="flex flex-col items-center text-center">
                        <Leaf className="w-6 h-6 text-green-600 mb-2" />
                        <p className="text-xs font-semibold text-gray-900">100% Pure</p>
                        <p className="text-xs text-gray-600">Himalayan</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <Truck className="w-6 h-6 text-green-600 mb-2" />
                        <p className="text-xs font-semibold text-gray-900">Free Shipping</p>
                        <p className="text-xs text-gray-600">Over ₹999</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <Shield className="w-6 h-6 text-green-600 mb-2" />
                        <p className="text-xs font-semibold text-gray-900">Lab Tested</p>
                        <p className="text-xs text-gray-600">Certified</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <Award className="w-6 h-6 text-green-600 mb-2" />
                        <p className="text-xs font-semibold text-gray-900">Premium</p>
                        <p className="text-xs text-gray-600">Quality</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24 bg-orange-50 border-orange-200 p-6 space-y-6">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                      
                      <div className="space-y-3 mb-4 pb-4 border-b">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                        </div>
                        {appliedDiscount > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Discount ({appliedDiscount}%)</span>
                            <span className="font-semibold">-₹{discountAmount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-semibold">{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tax (5% GST)</span>
                          <span className="font-semibold">₹{tax.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex justify-between mb-6">
                        <span className="font-serif font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-orange-700">₹{total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Discount Code */}
                    <div className="border-t pt-4">
                      <label className="text-sm font-semibold text-gray-900 block mb-2">Discount Code</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter code"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          data-testid="input-discount-code"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={applyDiscount}
                          data-testid="button-apply-discount"
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Try: SAVE10, PAHADI20, WELCOME15</p>
                    </div>

                    {/* Checkout Buttons */}
                    <div className="border-t pt-4 space-y-3">
                      <Button
                        onClick={handleRazorpayCheckout}
                        data-testid="button-checkout-razorpay"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold gap-2"
                      >
                        <CreditCard className="w-5 h-5" />
                        Pay with Razorpay
                      </Button>
                      <Button
                        onClick={checkout}
                        variant="outline"
                        data-testid="button-checkout-whatsapp"
                        className="w-full py-3 font-semibold gap-2"
                      >
                        <Phone className="w-5 h-5" />
                        Order via WhatsApp
                      </Button>
                    </div>

                    {/* Shipping Info */}
                    <div className="border-t pt-4 text-xs text-gray-600 space-y-2">
                      <div className="flex items-start gap-2">
                        <Truck className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-600" />
                        <span><strong>Delivery:</strong> 2-4 business days</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-600" />
                        <span><strong>Returns:</strong> 7-day money-back guarantee</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

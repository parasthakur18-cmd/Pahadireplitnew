import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import type { Product } from "@shared/schema";

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout?: () => void;
  children?: React.ReactNode;
}

export default function Cart({ items, onUpdateQuantity, onRemoveItem, onCheckout, children }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mb-4">Add some Himalayan goodness to your cart!</p>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-300px)] pr-4 mt-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4" data-testid={`cart-item-${item.id}`}>
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1 truncate" data-testid={`text-cart-item-name-${item.id}`}>
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">{item.weight}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          data-testid={`button-decrease-${item.id}`}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm" data-testid={`text-quantity-${item.id}`}>
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          data-testid={`button-increase-${item.id}`}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-between items-end">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => onRemoveItem(item.id)}
                        data-testid={`button-remove-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <p className="font-semibold" data-testid={`text-item-total-${item.id}`}>
                        ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span data-testid="text-subtotal">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span data-testid="text-shipping">
                  {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              {subtotal < 999 && subtotal > 0 && (
                <p className="text-xs text-muted-foreground">
                  Add ₹{(999 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span data-testid="text-total">₹{total.toFixed(2)}</span>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                onClick={onCheckout}
                data-testid="button-checkout"
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => window.open('https://wa.me/919001949260', '_blank')}
                data-testid="button-whatsapp-order"
              >
                Order via WhatsApp
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

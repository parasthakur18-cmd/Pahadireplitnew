import { Link } from "wouter";
import { ShoppingCart, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function Header({ cartItemCount = 0, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <p data-testid="text-announcement">100% Pure Himalayan Sourcing • Lab Tested • Free Shipping on Orders Over ₹999</p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a data-testid="link-home" className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2 -ml-3">
              <span className="font-serif text-2xl font-bold text-foreground">The Pahadi Company</span>
            </a>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/">
              <a data-testid="link-shop" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md">Shop</a>
            </Link>
            <Link href="/about">
              <a data-testid="link-about" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md">Our Story</a>
            </Link>
            <Link href="/sourcing">
              <a data-testid="link-sourcing" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md">How It's Sourced</a>
            </Link>
            <Link href="/blog">
              <a data-testid="link-blog" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md">Blog</a>
            </Link>
            <Link href="/contact">
              <a data-testid="link-contact" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md">Contact</a>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              data-testid="button-whatsapp"
              onClick={() => window.open('https://wa.me/919001949260', '_blank')}
              className="hidden sm:flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span className="text-xs">WhatsApp</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              data-testid="button-cart"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge 
                  data-testid="badge-cart-count"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              data-testid="button-mobile-menu"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-2 border-t">
            <Link href="/">
              <a data-testid="link-mobile-shop" className="block px-3 py-2 text-sm font-medium hover-elevate rounded-md">Shop</a>
            </Link>
            <Link href="/about">
              <a data-testid="link-mobile-about" className="block px-3 py-2 text-sm font-medium hover-elevate rounded-md">Our Story</a>
            </Link>
            <Link href="/sourcing">
              <a data-testid="link-mobile-sourcing" className="block px-3 py-2 text-sm font-medium hover-elevate rounded-md">How It's Sourced</a>
            </Link>
            <Link href="/blog">
              <a data-testid="link-mobile-blog" className="block px-3 py-2 text-sm font-medium hover-elevate rounded-md">Blog</a>
            </Link>
            <Link href="/contact">
              <a data-testid="link-mobile-contact" className="block px-3 py-2 text-sm font-medium hover-elevate rounded-md">Contact</a>
            </Link>
            <Button
              variant="outline"
              size="sm"
              data-testid="button-mobile-whatsapp"
              onClick={() => window.open('https://wa.me/919001949260', '_blank')}
              className="flex items-center gap-2 w-full justify-center mt-2"
            >
              <Phone className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}

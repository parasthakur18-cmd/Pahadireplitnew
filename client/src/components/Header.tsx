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
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-black/5">
      <div className="bg-gradient-to-r from-orange-700 to-orange-600 text-white py-3 text-center text-xs font-semibold tracking-wide letter-spacing">
        <p data-testid="text-announcement">PURE HIMALAYAN • LAB TESTED • ETHICALLY SOURCED</p>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/">
            <a data-testid="link-home" className="group hover-elevate rounded-lg px-2 py-3">
              <span className="font-serif text-3xl font-bold text-black group-hover:text-orange-700 transition-colors">The Pahadi Company</span>
            </a>
          </Link>

          <nav className="hidden lg:flex items-center gap-12">
            <Link href="/">
              <a data-testid="link-shop" className="text-sm font-semibold text-black/70 hover:text-orange-700 transition-colors">Shop</a>
            </Link>
            <Link href="/about">
              <a data-testid="link-about" className="text-sm font-semibold text-black/70 hover:text-orange-700 transition-colors">Our Story</a>
            </Link>
            <Link href="/sourcing">
              <a data-testid="link-sourcing" className="text-sm font-semibold text-black/70 hover:text-orange-700 transition-colors">How It's Sourced</a>
            </Link>
            <Link href="/blog">
              <a data-testid="link-blog" className="text-sm font-semibold text-black/70 hover:text-orange-700 transition-colors">Blog</a>
            </Link>
            <Link href="/contact">
              <a data-testid="link-contact" className="text-sm font-semibold text-black/70 hover:text-orange-700 transition-colors">Contact</a>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              data-testid="button-whatsapp"
              onClick={() => window.open('https://wa.me/919001949260', '_blank')}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md px-5"
            >
              <Phone className="w-4 h-4" />
              <span className="text-xs font-bold">Order Now</span>
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

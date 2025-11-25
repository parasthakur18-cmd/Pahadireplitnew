import { Link } from "wouter";
import { ShoppingCart, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import logoImage from "@assets/Black Circle BG (1)_1764042432325.png";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function Header({ cartItemCount = 0, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-orange-700 text-white py-2.5 text-center text-xs font-semibold tracking-wide">
        <p data-testid="text-announcement">100% Pure Himalayan Sourcing • Lab Tested • Free Shipping on Orders Over ₹999</p>
      </div>
      
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            <Link href="/" asChild>
              <a data-testid="link-home" className="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition-opacity">
                <img src={logoImage} alt="The Pahadi Company" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                <div className="flex flex-col leading-tight hidden sm:block flex-shrink-0">
                  <span className="font-serif text-xs font-semibold text-gray-500">THE PAHADI</span>
                  <span className="font-serif text-xs font-light text-gray-600">Himalayan Essentials</span>
                </div>
              </a>
            </Link>

            <nav className="hidden md:flex items-center gap-8 flex-1 ml-8">
              <Link href="/" asChild>
                <a data-testid="link-shop" className="text-sm font-medium text-gray-700 hover:text-orange-700 transition-colors whitespace-nowrap">Shop</a>
              </Link>
              <Link href="/about" asChild>
                <a data-testid="link-about" className="text-sm font-medium text-gray-700 hover:text-orange-700 transition-colors whitespace-nowrap">Our Story</a>
              </Link>
              <Link href="/sourcing" asChild>
                <a data-testid="link-sourcing" className="text-sm font-medium text-gray-700 hover:text-orange-700 transition-colors whitespace-nowrap">How It's Sourced</a>
              </Link>
              <Link href="/blog" asChild>
                <a data-testid="link-blog" className="text-sm font-medium text-gray-700 hover:text-orange-700 transition-colors whitespace-nowrap">Blog</a>
              </Link>
              <Link href="/contact" asChild>
                <a data-testid="link-contact" className="text-sm font-medium text-gray-700 hover:text-orange-700 transition-colors whitespace-nowrap">Contact</a>
              </Link>
            </nav>

            <div className="flex items-center gap-2 ml-auto">
              <Button
                size="sm"
                data-testid="button-whatsapp"
                onClick={() => window.open('https://wa.me/919001949260', '_blank')}
                className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white h-9"
              >
                <Phone className="w-4 h-4" />
                <span className="text-xs font-semibold">WhatsApp</span>
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
            <nav className="md:hidden py-3 flex flex-col gap-1 border-t">
              <Link href="/" asChild>
                <a data-testid="link-mobile-shop" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-700">Shop</a>
              </Link>
              <Link href="/about" asChild>
                <a data-testid="link-mobile-about" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-700">Our Story</a>
              </Link>
              <Link href="/sourcing" asChild>
                <a data-testid="link-mobile-sourcing" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-700">How It's Sourced</a>
              </Link>
              <Link href="/blog" asChild>
                <a data-testid="link-mobile-blog" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-700">Blog</a>
              </Link>
              <Link href="/contact" asChild>
                <a data-testid="link-mobile-contact" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-700">Contact</a>
              </Link>
              <Button
                size="sm"
                data-testid="button-mobile-whatsapp"
                onClick={() => window.open('https://wa.me/919001949260', '_blank')}
                className="flex items-center gap-2 w-full justify-center mt-2 bg-green-600 text-white"
              >
                <Phone className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

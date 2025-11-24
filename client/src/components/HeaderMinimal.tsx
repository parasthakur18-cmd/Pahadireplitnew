import { Link } from "wouter";
import { ShoppingCart, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function HeaderMinimal({ cartItemCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <Link href="/">
            <a className="text-2xl font-serif font-bold text-gray-900">The Pahadi Company</a>
          </Link>

          <nav className="hidden lg:flex items-center gap-12">
            <Link href="/"><a className="text-sm font-medium text-gray-600 hover:text-orange-700">Shop</a></Link>
            <Link href="/about"><a className="text-sm font-medium text-gray-600 hover:text-orange-700">Our Story</a></Link>
            <Link href="/sourcing"><a className="text-sm font-medium text-gray-600 hover:text-orange-700">How It's Sourced</a></Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:flex bg-green-600 hover:bg-green-700 text-white gap-2 h-9">
              <Phone className="w-4 h-4" />
              <span className="text-xs font-semibold">Order</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">{cartItemCount}</Badge>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

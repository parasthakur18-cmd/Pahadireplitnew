import { Link } from "wouter";
import { ShoppingCart, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function HeaderLuxury({ cartItemCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-100 to-orange-100 border-b-2 border-orange-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <a className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center shadow">
                <span className="text-white font-serif font-bold text-base">पा</span>
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-orange-900">The Pahadi</h1>
                <p className="text-xs text-orange-700 font-semibold">Company</p>
              </div>
            </a>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            <Link href="/"><a className="text-sm font-semibold text-orange-900 hover:text-orange-700">Shop</a></Link>
            <Link href="/about"><a className="text-sm font-semibold text-orange-900 hover:text-orange-700">Our Story</a></Link>
            <Link href="/sourcing"><a className="text-sm font-semibold text-orange-900 hover:text-orange-700">Sourcing</a></Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:flex bg-orange-600 hover:bg-orange-700 text-white gap-2 h-9">
              <Phone className="w-4 h-4" />
              <span className="text-xs font-semibold">Order</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative text-orange-700 hover:bg-orange-200">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-600 text-white">{cartItemCount}</Badge>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

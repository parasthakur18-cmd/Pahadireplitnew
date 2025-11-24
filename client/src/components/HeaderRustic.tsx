import { Link } from "wouter";
import { ShoppingCart, Menu, Phone, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function HeaderRustic({ cartItemCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-orange-50 border-b-4 border-orange-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <a className="flex items-center gap-3">
              <Mountain className="w-8 h-8 text-orange-700" />
              <span className="font-serif text-2xl font-bold text-orange-900">The Pahadi Company</span>
            </a>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            <Link href="/"><a className="text-sm font-semibold text-orange-800 hover:text-orange-600">Shop</a></Link>
            <Link href="/about"><a className="text-sm font-semibold text-orange-800 hover:text-orange-600">Our Story</a></Link>
            <Link href="/sourcing"><a className="text-sm font-semibold text-orange-800 hover:text-orange-600">Sourcing</a></Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:flex bg-orange-700 hover:bg-orange-800 text-white gap-2 h-9">
              <Phone className="w-4 h-4" />
              <span className="text-xs font-semibold">Order</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative text-orange-700">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-700 text-white">{cartItemCount}</Badge>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

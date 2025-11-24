import { Link } from "wouter";
import { ShoppingCart, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function HeaderBold({ cartItemCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-black text-white border-b-4 border-orange-600">
      <div className="bg-orange-600 text-white py-2 text-center text-xs font-bold tracking-widest">
        LUXURY HIMALAYAN HERITAGE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <a className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded flex items-center justify-center">
                <span className="font-serif font-bold text-white text-lg">P</span>
              </div>
              <span className="font-serif text-xl font-black text-white">THE PAHADI</span>
            </a>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            <Link href="/"><a className="text-sm font-bold text-gray-300 hover:text-orange-500">SHOP</a></Link>
            <Link href="/about"><a className="text-sm font-bold text-gray-300 hover:text-orange-500">STORY</a></Link>
            <Link href="/sourcing"><a className="text-sm font-bold text-gray-300 hover:text-orange-500">SOURCING</a></Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:flex bg-orange-600 hover:bg-orange-700 text-white gap-2 h-9 font-bold">
              <Phone className="w-4 h-4" />
              <span className="text-xs">ORDER</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative text-white hover:bg-white/10">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-600">{cartItemCount}</Badge>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

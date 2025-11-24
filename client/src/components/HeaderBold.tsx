import { Link } from "wouter";
import { ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function HeaderBold({ cartItemCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-black text-white border-b-4 border-orange-700 shadow-2xl">
      <div className="bg-gradient-to-r from-orange-700 to-orange-600 text-white py-3 text-center text-xs font-black tracking-widest letter-spacing">
        LUXURY HIMALAYAN HERITAGE • SINCE 2020
      </div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/">
            <a className="flex items-center gap-3 hover-elevate rounded-lg px-3 py-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow">
                <span className="text-white font-serif font-black text-2xl">P</span>
              </div>
              <h1 className="font-serif text-3xl font-black text-white">THE PAHADI COMPANY</h1>
            </a>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            <Link href="/"><a className="text-sm font-bold text-white/80 hover:text-orange-500 transition">SHOP</a></Link>
            <Link href="/about"><a className="text-sm font-bold text-white/80 hover:text-orange-500 transition">STORY</a></Link>
            <Link href="/sourcing"><a className="text-sm font-bold text-white/80 hover:text-orange-500 transition">SOURCING</a></Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button size="sm" className="hidden sm:flex bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white gap-2 font-bold shadow-xl px-6">
              <Phone className="w-4 h-4" />
              ORDER NOW
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative text-white hover:bg-white/10">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-600 text-white font-bold">{cartItemCount}</Badge>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

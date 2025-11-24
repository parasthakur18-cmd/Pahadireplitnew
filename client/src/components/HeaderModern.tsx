import { Link } from "wouter";
import { ShoppingCart, Menu, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function HeaderModern({ cartItemCount = 0, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black text-white border-b-2 border-orange-600">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="flex items-center justify-between h-28">
          <Link href="/">
            <a data-testid="link-home" className="flex items-center gap-3 hover-elevate rounded-lg px-2 py-2">
              <h1 className="font-serif text-3xl font-bold text-white">The Pahadi Company</h1>
            </a>
          </Link>

          <div className="hidden lg:flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-full flex-1 mx-10 border border-white/10">
            <Search className="w-4 h-4 text-white/50" />
            <Input 
              placeholder="Search products..." 
              className="border-0 bg-transparent placeholder:text-white/40 text-white focus-visible:ring-0"
            />
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            <Link href="/"><a className="text-sm font-semibold text-white/80 hover:text-orange-500">Shop</a></Link>
            <Link href="/about"><a className="text-sm font-semibold text-white/80 hover:text-orange-500">Story</a></Link>
            <Link href="/sourcing"><a className="text-sm font-semibold text-white/80 hover:text-orange-500">Sourcing</a></Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:flex bg-gradient-to-r from-green-600 to-green-700 text-white gap-2 shadow-lg">
              <Phone className="w-4 h-4" />
              <span>Order</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative text-white hover:bg-white/10">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-600">{cartItemCount}</Badge>}
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

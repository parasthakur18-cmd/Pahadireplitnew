import { Link } from "wouter";
import { ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function HeaderMinimal({ cartItemCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-black/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <a className="hover-elevate rounded-lg px-2 py-3 group">
              <h1 className="font-serif text-3xl font-bold text-black group-hover:text-orange-700 transition-colors">The Pahadi Company</h1>
            </a>
          </Link>

          <nav className="hidden lg:flex items-center gap-14">
            <Link href="/"><a className="text-sm font-semibold text-black/70 hover:text-orange-700 transition">Shop</a></Link>
            <Link href="/about"><a className="text-sm font-semibold text-black/70 hover:text-orange-700 transition">Story</a></Link>
            <Link href="/sourcing"><a className="text-sm font-semibold text-black/70 hover:text-orange-700 transition">How It's Made</a></Link>
            <Link href="/blog"><a className="text-sm font-semibold text-black/70 hover:text-orange-700 transition">Articles</a></Link>
            <Link href="/contact"><a className="text-sm font-semibold text-black/70 hover:text-orange-700 transition">Contact</a></Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button size="sm" className="hidden sm:flex bg-gradient-to-r from-green-600 to-green-700 text-white gap-2 shadow-md px-6">
              <Phone className="w-4 h-4" />
              <span className="font-semibold">Order</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative hover:bg-orange-100">
              <ShoppingCart className="w-5 h-5 text-black" />
              {cartItemCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-700 text-white">{cartItemCount}</Badge>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

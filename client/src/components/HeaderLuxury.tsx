import { Link } from "wouter";
import { ShoppingCart, Menu, Phone, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function HeaderLuxury({ cartItemCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-orange-800 via-orange-700 to-orange-900 text-white shadow-xl border-b-4 border-orange-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-4 hover-elevate rounded-lg px-3 py-2">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20 shadow-xl">
                <span className="text-4xl">🏔️</span>
              </div>
              <div>
                <h1 className="font-serif text-3xl font-bold text-white">The Pahadi Company</h1>
                <p className="text-xs text-white/70 font-semibold tracking-widest">HIMALAYAN HERITAGE</p>
              </div>
            </a>
          </Link>

          <nav className="hidden lg:flex items-center gap-14">
            <Link href="/"><a className="text-sm font-bold text-white/90 hover:text-yellow-300 transition">SHOP</a></Link>
            <Link href="/about"><a className="text-sm font-bold text-white/90 hover:text-yellow-300 transition">STORY</a></Link>
            <Link href="/sourcing"><a className="text-sm font-bold text-white/90 hover:text-yellow-300 transition">SOURCING</a></Link>
            <Link href="/contact"><a className="text-sm font-bold text-white/90 hover:text-yellow-300 transition">CONTACT</a></Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button size="sm" className="hidden sm:flex bg-white text-orange-800 hover:bg-yellow-100 gap-2 font-bold shadow-xl px-6">
              <Phone className="w-4 h-4" />
              ORDER NOW
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative text-white hover:bg-white/10">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-yellow-300 text-orange-800 font-bold">{cartItemCount}</Badge>}
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

import { Link } from "wouter";
import { ShoppingCart, Phone, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function HeaderRustic({ cartItemCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-orange-50 to-orange-100/50 border-b-2 border-orange-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 hover-elevate rounded-lg px-3 py-2">
              <Mountain className="w-8 h-8 text-orange-700" />
              <h1 className="font-serif text-2xl font-bold text-orange-900">The Pahadi Company</h1>
            </a>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            <Link href="/"><a className="text-sm font-medium text-orange-900/80 hover:text-orange-900">Shop All</a></Link>
            <Link href="/about"><a className="text-sm font-medium text-orange-900/80 hover:text-orange-900">Our Story</a></Link>
            <Link href="/sourcing"><a className="text-sm font-medium text-orange-900/80 hover:text-orange-900">Sourcing</a></Link>
            <Link href="/blog"><a className="text-sm font-medium text-orange-900/80 hover:text-orange-900">Recipes</a></Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button size="sm" className="hidden sm:flex bg-orange-700 hover:bg-orange-800 text-white gap-2">
              <Phone className="w-4 h-4" />
              WhatsApp
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative text-orange-900">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-700 text-white">{cartItemCount}</Badge>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

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
    <header className="sticky top-0 z-50 bg-gradient-to-br from-yellow-50 via-orange-50 to-orange-100 border-b-4 border-orange-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-4 hover-elevate rounded-lg px-3 py-2">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center shadow-lg">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-orange-900">The Pahadi Company</h1>
            </a>
          </Link>

          <nav className="hidden lg:flex items-center gap-12">
            <Link href="/"><a className="text-sm font-bold text-orange-900/80 hover:text-orange-700">Shop</a></Link>
            <Link href="/about"><a className="text-sm font-bold text-orange-900/80 hover:text-orange-700">Our Story</a></Link>
            <Link href="/sourcing"><a className="text-sm font-bold text-orange-900/80 hover:text-orange-700">Sourcing</a></Link>
            <Link href="/blog"><a className="text-sm font-bold text-orange-900/80 hover:text-orange-700">Recipes</a></Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button size="sm" className="hidden sm:flex bg-gradient-to-r from-orange-700 to-orange-800 hover:from-orange-800 hover:to-orange-900 text-white gap-2 shadow-lg px-6 font-bold">
              <Phone className="w-4 h-4" />
              Order
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative text-orange-700 hover:bg-orange-200">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-700 text-white">{cartItemCount}</Badge>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

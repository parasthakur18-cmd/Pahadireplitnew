import { Link } from "wouter";
import { ShoppingCart, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function HeaderModern({ cartItemCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className="border-b border-orange-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/">
              <a data-testid="link-home" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-base">पा</span>
                </div>
                <span className="font-serif text-xl font-bold text-white">The Pahadi Company</span>
              </a>
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              <Link href="/"><a className="text-sm font-medium text-gray-300 hover:text-white">Shop</a></Link>
              <Link href="/about"><a className="text-sm font-medium text-gray-300 hover:text-white">Our Story</a></Link>
              <Link href="/sourcing"><a className="text-sm font-medium text-gray-300 hover:text-white">How It's Sourced</a></Link>
            </nav>

            <div className="flex items-center gap-2">
              <Button size="sm" className="hidden sm:flex bg-green-600 hover:bg-green-700 text-white gap-2 h-9">
                <Phone className="w-4 h-4" />
                <span className="text-xs font-semibold">Order</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={onCartClick} className="relative text-white hover:bg-white/10">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-600">{cartItemCount}</Badge>}
              </Button>
              <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

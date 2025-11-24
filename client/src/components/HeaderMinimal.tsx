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
    <header className="sticky top-0 z-50 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="hover-elevate rounded-lg px-3 py-2">
              <h1 className="font-serif text-2xl font-bold text-black">The Pahadi Company</h1>
            </a>
          </Link>

          <nav className="hidden md:flex items-center gap-12">
            <Link href="/"><a className="text-sm font-medium text-black/70 hover:text-black">Shop</a></Link>
            <Link href="/about"><a className="text-sm font-medium text-black/70 hover:text-black">Story</a></Link>
            <Link href="/sourcing"><a className="text-sm font-medium text-black/70 hover:text-black">How It's Made</a></Link>
            <Link href="/blog"><a className="text-sm font-medium text-black/70 hover:text-black">Articles</a></Link>
            <Link href="/contact"><a className="text-sm font-medium text-black/70 hover:text-black">Contact</a></Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline" className="hidden sm:flex gap-2 border-black/20">
              <Phone className="w-4 h-4" />
              <span className="text-xs">Order</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">{cartItemCount}</Badge>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

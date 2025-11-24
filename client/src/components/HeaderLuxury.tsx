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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary via-orange-700 to-primary text-white border-b-4 border-orange-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 hover-elevate rounded-lg px-4 py-2">
              <h1 className="font-serif text-3xl font-bold text-white">The Pahadi Company</h1>
            </a>
          </Link>

          <nav className="hidden lg:flex items-center gap-12">
            <Link href="/"><a className="text-sm font-semibold text-white/90 hover:text-white transition">Shop</a></Link>
            <Link href="/about"><a className="text-sm font-semibold text-white/90 hover:text-white transition">Heritage</a></Link>
            <Link href="/sourcing"><a className="text-sm font-semibold text-white/90 hover:text-white transition">Sourcing</a></Link>
            <Link href="/contact"><a className="text-sm font-semibold text-white/90 hover:text-white transition">Contact</a></Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button size="sm" className="hidden sm:flex bg-white text-primary hover:bg-white/90 gap-2 font-semibold shadow-lg">
              <Phone className="w-4 h-4" />
              WhatsApp
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative text-white hover:bg-white/10">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-yellow-300 text-primary">{cartItemCount}</Badge>}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

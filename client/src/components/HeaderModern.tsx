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
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/">
            <a data-testid="link-home" className="flex items-center gap-2 hover-elevate rounded-lg px-3 py-2">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-orange-600 to-orange-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-serif font-bold text-2xl">🏔</span>
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-foreground">The Pahadi</h1>
                <p className="text-xs text-muted-foreground font-semibold">Pure Himalayan</p>
              </div>
            </a>
          </Link>

          <div className="hidden lg:flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg flex-1 mx-8">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search honey, ghee, teas..." 
              className="border-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-0"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/"><a className="text-sm font-medium text-foreground/70 hover:text-foreground">Shop</a></Link>
            <Link href="/about"><a className="text-sm font-medium text-foreground/70 hover:text-foreground">Story</a></Link>
            <Link href="/sourcing"><a className="text-sm font-medium text-foreground/70 hover:text-foreground">Sourcing</a></Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white hidden sm:flex gap-2">
              <Phone className="w-4 h-4" />
              Chat
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">{cartItemCount}</Badge>}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

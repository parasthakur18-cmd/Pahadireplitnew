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
    <header className="sticky top-0 z-50 bg-foreground text-background border-b-4 border-primary">
      <div className="bg-primary text-background py-1.5 text-center text-xs font-bold tracking-widest">
        PURE HIMALAYAN • FARM TO TABLE • TRUSTED SINCE 2020
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <a className="flex items-center gap-3 hover-elevate rounded-lg px-4 py-2">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-3xl font-serif font-bold">P</span>
              </div>
              <div>
                <h1 className="font-serif text-2xl font-black text-background">PAHADI</h1>
                <p className="text-xs text-background/70 font-bold">HIMALAYAN TREASURES</p>
              </div>
            </a>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/"><a className="text-sm font-bold text-background/90 hover:text-background">SHOP</a></Link>
            <Link href="/about"><a className="text-sm font-bold text-background/90 hover:text-background">STORY</a></Link>
            <Link href="/sourcing"><a className="text-sm font-bold text-background/90 hover:text-background">SOURCING</a></Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button size="sm" className="hidden sm:flex bg-primary text-foreground hover:bg-primary/90 gap-2 font-bold">
              <Phone className="w-4 h-4" />
              WHATSAPP
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative text-background hover:bg-background/10">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-foreground">{cartItemCount}</Badge>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">The Pahadi Company</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Bringing authentic Himalayan wellness to your doorstep. Pure, sustainable, and traditionally sourced.
            </p>
            <div className="flex gap-2">
              <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <a href="tel:+919001949260" className="text-sm hover-elevate rounded px-1" data-testid="link-phone">
                +91 90019 49260
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/"><a className="text-sm text-muted-foreground hover-elevate rounded px-1" data-testid="link-footer-shop">Shop</a></Link></li>
              <li><Link href="/about"><a className="text-sm text-muted-foreground hover-elevate rounded px-1" data-testid="link-footer-about">About Us</a></Link></li>
              <li><Link href="/sourcing"><a className="text-sm text-muted-foreground hover-elevate rounded px-1" data-testid="link-footer-sourcing">How It's Sourced</a></Link></li>
              <li><Link href="/blog"><a className="text-sm text-muted-foreground hover-elevate rounded px-1" data-testid="link-footer-blog">Blog & Recipes</a></Link></li>
              <li><Link href="/contact"><a className="text-sm text-muted-foreground hover-elevate rounded px-1" data-testid="link-footer-contact">Contact</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy"><a className="text-sm text-muted-foreground hover-elevate rounded px-1" data-testid="link-footer-privacy">Privacy Policy</a></Link></li>
              <li><Link href="/terms"><a className="text-sm text-muted-foreground hover-elevate rounded px-1" data-testid="link-footer-terms">Terms & Conditions</a></Link></li>
              <li><Link href="/shipping"><a className="text-sm text-muted-foreground hover-elevate rounded px-1" data-testid="link-footer-shipping">Shipping & Returns</a></Link></li>
              <li><Link href="/faq"><a className="text-sm text-muted-foreground hover-elevate rounded px-1" data-testid="link-footer-faq">FAQ</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get updates on new products and special offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-newsletter-email"
                className="flex-1"
              />
              <Button type="submit" data-testid="button-newsletter-submit">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 The Pahadi Company. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://wa.me/919001949260', '_blank')}
              data-testid="button-footer-whatsapp"
            >
              <Phone className="w-4 h-4 mr-2" />
              Order on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

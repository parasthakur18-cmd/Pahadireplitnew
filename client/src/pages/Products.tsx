import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useSEOMeta } from "@/components/SEOMeta";
import logoImage from "@assets/Black Circle BG (1)_1764042432325.png";
import type { Product } from "@shared/schema";

export default function Products() {
  useSEOMeta({
    title: "Organic Himalayan Products - Buy Online | The पहाड़ी Company",
    description: "Shop authentic organic Himalayan products online. Premium honey, ghee, herbal tea, walnut oil, amla powder, salt & shilajit. Free shipping, lab-tested Pahadi products.",
    keywords: "buy himalayan products online, organic products, pahadi products, himalayan honey, desi ghee, herbal tea, walnut oil, organic amla powder, himalayan salt, shilajit",
    url: window.location.href,
    schemaMarkup: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Organic Himalayan Products',
      'description': 'Premium collection of authentic Himalayan organic products'
    }
  });
  const [cartCount, setCartCount] = useState(0);
  const [sessionId, setSessionId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    'Liquids & Beverages',
    'Pulses & Grains',
    'Ghee & Honey',
    'Combos',
    'Corporate Gifting',
    'Best Sellers',
    'New Arrivals',
    'Limited Edition',
    'Bulk Orders'
  ];

  useEffect(() => {
    const id = localStorage.getItem("sessionId") || crypto.randomUUID();
    localStorage.setItem("sessionId", id);
    setSessionId(id);
    loadCartCount(id);
  }, []);

  const loadCartCount = async (id: string) => {
    const res = await fetch(`/api/cart/${id}`);
    const items = await res.json();
    setCartCount(items.length);
  };

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const addToCart = async (product: Product) => {
    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        quantity: 1,
        sessionId
      })
    });
    if (res.ok) {
      setCartCount(c => c + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cartItemCount={cartCount} onCartClick={() => window.location.href = "/cart"} />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-8" data-testid="breadcrumb">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <a href="/" className="text-orange-700 hover:text-orange-800 transition-colors">Home</a>
              <span>›</span>
              <span className="text-foreground font-medium">Products</span>
            </div>
          </nav>
          
          <div className="mb-12 flex flex-col items-center">
            <img src={logoImage} alt="The Pahadi Company" className="w-20 h-20 rounded-full mb-6 object-cover" data-testid="img-logo-products" />
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2 text-center">Our Collection</h1>
            <p className="text-lg text-muted-foreground text-center">Discover our complete range of authentic Himalayan products</p>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? 'default' : 'outline'}
              className="text-sm"
              data-testid="button-category-all"
            >
              All Products
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className="text-sm"
                data-testid={`button-category-${cat.toLowerCase().replace(/\s/g, '-')}`}
              >
                {cat}
              </Button>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mb-6">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: Product) => (
              <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                <Link href={`/product/${product.slug}`}>
                  <a className="block w-full h-80 bg-gray-100 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" data-testid={`img-product-list-${product.id}`} />
                  </a>
                </Link>
                
                <div className="p-4 flex flex-col flex-1">
                  <Link href={`/product/${product.slug}`}>
                    <a>
                      <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{product.tagline}</p>
                    </a>
                  </Link>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-orange-700">₹{product.price}</span>
                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      data-testid={`button-add-to-cart-${product.id}`}
                      className="bg-green-600 hover:bg-green-700 text-white gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

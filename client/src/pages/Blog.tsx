import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { useSEOMeta } from "@/components/SEOMeta";
import { ArrowRight } from "lucide-react";
import logoImage from "@assets/Black Circle BG (1)_1764042432325.png";

const blogPosts = [
  {
    id: 1,
    slug: 'benefits-of-raw-himalayan-honey',
    title: 'Health Benefits of Raw Himalayan Honey - Complete Guide',
    description: 'Discover the incredible health benefits of raw Himalayan wildflower honey. Learn about antioxidants, immunity, digestion, and why raw honey is better than processed alternatives.',
    category: 'Honey',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1587049352086-d32dba6f0311?w=400&h=300&fit=crop',
    excerpt: 'Raw Himalayan honey is packed with enzymes, antioxidants, and natural minerals that support immunity, digestion, and overall wellness. Learn why it\'s the world\'s finest honey.',
    keywords: 'raw honey benefits, himalayan honey, honey health benefits, organic honey'
  },
  {
    id: 2,
    slug: 'organic-ghee-vs-regular-ghee',
    title: 'Organic A2 Ghee vs Regular Ghee - Which is Better for You?',
    description: 'Compare organic A2 ghee with regular ghee. Understand the differences, health benefits, cooking uses, and why authentic Pahadi desi ghee is superior for Ayurveda and cooking.',
    category: 'Ghee',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd67e90?w=400&h=300&fit=crop',
    excerpt: 'A2 ghee from grass-fed Pahadi cows offers unique nutritional benefits. Discover why traditional bilona ghee is the healthiest choice for your family.',
    keywords: 'organic ghee, A2 ghee, desi ghee benefits, pahadi ghee'
  },
  {
    id: 3,
    slug: 'himalayan-salt-vs-table-salt',
    title: 'Himalayan Pink Salt Benefits - 84 Minerals Your Body Needs',
    description: 'Learn why Himalayan pink salt is superior to regular table salt. Contains 84 trace minerals naturally occurring in the human body. Perfect for cooking, baths, and wellness.',
    category: 'Salt',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1609899153211-b3b3f5ec5d45?w=400&h=300&fit=crop',
    excerpt: 'Himalayan pink salt has been used for thousands of years for its mineral-rich composition and health benefits. Learn why it\'s better than processed sea salt.',
    keywords: 'himalayan salt benefits, pink salt, mineral salt, trace minerals'
  },
  {
    id: 4,
    slug: 'how-to-use-shilajit-resin',
    title: 'Complete Guide to Shilajit - Benefits, Dosage, and Usage',
    description: 'Comprehensive guide to using authentic Himalayan shilajit resin. Learn about fulvic acid, 85 minerals, dosage, preparation methods, and incredible health benefits for stamina and vitality.',
    category: 'Wellness',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1598928506626-dee04b4d37f6?w=400&h=300&fit=crop',
    excerpt: 'Shilajit is nature\'s most powerful adaptogen. Discover how this ancient Himalayan mineral resin can boost energy, immunity, and longevity.',
    keywords: 'shilajit benefits, shilajit resin, fulvic acid, ayurvedic medicine'
  },
  {
    id: 5,
    slug: 'organic-herbal-tea-immune-system',
    title: 'Himalayan Herbal Tea - Boost Immunity Naturally',
    description: 'Discover how Himalayan herbal tea blend with tulsi, lemongrass, and ginger boosts immunity naturally. Perfect for stress relief, respiratory health, and daily wellness.',
    category: 'Tea',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1597318620702-c09cc9bc2aa0?w=400&h=300&fit=crop',
    excerpt: 'Wild Himalayan herbs are nature\'s perfect immune booster. Learn how to prepare the perfect cup of herbal tea for maximum health benefits.',
    keywords: 'herbal tea benefits, immune tea, himalayan tea, organic tea'
  },
  {
    id: 6,
    slug: 'amla-powder-hair-skin-health',
    title: 'Amla Powder Benefits - Natural Vitamin C Superfood',
    description: 'Organic amla powder is the world\'s richest natural source of vitamin C. Learn how to use it for hair growth, skin glow, digestion, and immunity boosting.',
    category: 'Wellness',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1599909539811-c5268604bbe5?w=400&h=300&fit=crop',
    excerpt: 'Amla (Indian gooseberry) contains 30x more vitamin C than oranges. Transform your health with this ancient Ayurvedic superfood.',
    keywords: 'amla powder benefits, vitamin C, organic amla, natural hair growth'
  }
];

export default function Blog() {
  useSEOMeta({
    title: 'Blog - Himalayan Wellness Tips & Organic Product Guides | The पहाड़ी Company',
    description: 'Read expert guides on himalayan products, organic health benefits, wellness tips, and Ayurveda. Learn about honey, ghee, herbal tea, shilajit, and natural nutrition.',
    keywords: 'himalayan blog, wellness tips, organic health, product guides, ayurveda, natural remedies',
    url: window.location.href,
    schemaMarkup: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      'name': 'The Pahadi Company Blog',
      'description': 'Expert guides on Himalayan products and natural wellness'
    }
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
          
          <div className="mb-12 text-center">
            <img src={logoImage} alt="The Pahadi Company" className="w-20 h-20 rounded-full mx-auto mb-6 object-cover" data-testid="img-logo-blog" />
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Himalayan Wellness Blog</h1>
            <p className="text-lg text-muted-foreground">Expert guides on organic Himalayan products, natural remedies, and wellness tips backed by tradition and science.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} asChild>
                <a className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow" data-testid={`link-blog-${post.slug}`}>
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">{post.category}</span>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h2 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-orange-700 transition-colors">{post.title}</h2>
                    <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-orange-700 font-semibold text-sm">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

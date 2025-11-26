import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { useSEOMeta } from "@/components/SEOMeta";
import { Calendar, Clock, User } from "lucide-react";
import logoImage from "@assets/image_1764118320577.png";

const blogContent: Record<string, any> = {
  'benefits-of-raw-himalayan-honey': {
    title: 'Health Benefits of Raw Himalayan Honey - Complete Guide',
    description: 'Discover the incredible health benefits of raw Himalayan wildflower honey with complete nutritional information, usage, and Ayurvedic perspective.',
    keywords: 'raw honey benefits, himalayan honey, health benefits, antioxidants, immunity',
    author: 'The Pahadi Company',
    date: '2024-11-20',
    readTime: '8 min read',
    category: 'Honey',
    content: `
Raw Himalayan honey is one of nature's most powerful nutritional superfoods. Unlike processed honey, raw honey retains all its enzymes, beneficial bacteria, and naturally occurring compounds.

## Why Choose Raw Himalayan Honey?

Himalayan wildflower honey is harvested from flowers blooming at 8,000+ feet altitude. This altitude gives the honey unique properties:

- **Rich in Enzymes**: Over 22 different enzymes support digestion and nutrient absorption
- **84 Trace Minerals**: Naturally occurring minerals including zinc, iron, and potassium
- **Powerful Antioxidants**: Polyphenols and flavonoids fight oxidative stress
- **Natural Probiotics**: Beneficial bacteria that support gut health

## Key Health Benefits

### 1. Boosts Immunity
The combination of enzymes, minerals, and propolis makes raw honey a natural immune booster. Studies show regular consumption can reduce cold and flu incidence.

### 2. Aids Digestion
Raw honey with its intact enzymes helps break down food and support healthy gut bacteria. Ayurveda recommends it for improving digestive fire.

### 3. Provides Natural Energy
Unlike refined sugar, honey provides sustained energy through complex carbohydrates. Perfect for athletes and active individuals.

### 4. Anti-inflammatory Properties
Flavonoids and polyphenols reduce inflammation throughout the body, supporting joint and tissue health.

### 5. Supports Better Sleep
Taking a teaspoon of raw honey before bed helps regulate blood sugar, promoting deeper, more restorative sleep.

## How to Use Raw Himalayan Honey

- **Daily**: 1-2 teaspoons on empty stomach first thing in the morning
- **In Beverages**: Add to warm (not hot) water, tea, or smoothies
- **As Natural Sweetener**: Use in cooking instead of refined sugar
- **For Skin**: Apply topically as a face mask for natural glow

## Why Not Heated or Processed?

Heating honey above 40°C destroys the beneficial enzymes and reduces its nutritional value. That's why we never heat our raw Himalayan honey - you get 100% of nature's goodness.

The Pahadi Company sources directly from mountain communities, ensuring authenticity and purity in every jar.
    `
  },
  'organic-ghee-vs-regular-ghee': {
    title: 'Organic A2 Ghee vs Regular Ghee - Which is Better?',
    description: 'Complete comparison of organic A2 ghee vs regular ghee. Learn about benefits, cooking uses, Ayurvedic properties, and why Pahadi desi ghee is superior.',
    keywords: 'A2 ghee, organic ghee, desi ghee, ghee benefits, grass-fed ghee',
    author: 'The Pahadi Company',
    date: '2024-11-18',
    readTime: '6 min read',
    category: 'Ghee',
    content: 'A2 ghee from grass-fed Pahadi cows is superior to regular ghee due to its unique protein structure and nutritional profile...'
  }
};

export default function BlogPost() {
  const [params] = useLocation();
  const slug = params?.split('/blog/')[1];
  const post = blogContent[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
        </main>
        <Footer />
      </div>
    );
  }

  useSEOMeta({
    title: `${post.title} | The पहाड़ी Company Blog`,
    description: post.description,
    keywords: post.keywords,
    url: window.location.href,
    type: 'article',
    schemaMarkup: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.description,
      'author': {
        '@type': 'Organization',
        'name': post.author
      },
      'datePublished': post.date,
      'articleBody': post.content
    }
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title }
          ]} />

          <article data-testid={`article-${slug}`}>
            <header className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <img src={logoImage} alt="The Pahadi Company" className="w-16 h-16 rounded-full object-cover" data-testid="img-logo-blog-post" />
              </div>
              <div className="flex items-center gap-4 mb-4 justify-center">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">{post.category}</span>
                <span className="text-sm text-muted-foreground">{post.readTime}</span>
              </div>
              <h1 className="font-serif text-4xl font-bold text-foreground mb-4 text-center">{post.title}</h1>
              <div className="flex items-center gap-6 text-sm text-muted-foreground justify-center">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </header>

            <div className="prose prose-sm sm:prose max-w-none text-foreground">
              {post.content.split('\n').map((line: string, i: number) => {
                if (line.startsWith('##')) {
                  return <h2 key={i} className="font-serif text-2xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('###')) {
                  return <h3 key={i} className="font-serif text-xl font-bold mt-6 mb-3">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('-')) {
                  return <li key={i} className="ml-6 mb-2">{line.replace('- ', '')}</li>;
                }
                if (line.trim()) {
                  return <p key={i} className="mb-4 leading-relaxed">{line}</p>;
                }
                return null;
              })}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { ArrowRight, Award, Leaf, Mountain } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { useSEOMeta } from '@/components/SEOMeta';
import logoImage from '@assets/Black Circle BG (1)_1764042432325.png';

export default function About() {
  useSEOMeta({
    title: 'Our Story - The पहाड़ी Company | Authentic Himalayan Products',
    description: 'Learn about The Pahadi Company - our mission to bring authentic, lab-tested Himalayan products directly from mountain farmers to your doorstep.',
    keywords: 'about pahadi company, our story, himalayan products mission, organic farming',
    url: window.location.href,
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Our Story' }]} />

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h1>
            <p className="text-lg text-gray-700">Bringing pure Himalayan wellness to your home since 2020</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-12">
            {/* Mission Section */}
            <section className="space-y-6">
              <div className="flex items-start gap-4">
                <Mountain className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-serif text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    At The पहाड़ी Company, we are dedicated to preserving the authentic heritage of Himalayan wellness. We work directly with mountain farmers and communities to bring you the purest, most authentic products - untouched by commercialization, lab-tested for quality, and delivered with integrity.
                  </p>
                </div>
              </div>
            </section>

            {/* Values Section */}
            <section className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <Award className="w-12 h-12 text-orange-600" />
                <h3 className="font-serif text-2xl font-bold">Premium Quality</h3>
                <p className="text-gray-700">Every product is laboratory tested and certified for purity and potency. We maintain the highest standards of quality.</p>
              </div>
              <div className="space-y-4">
                <Leaf className="w-12 h-12 text-green-600" />
                <h3 className="font-serif text-2xl font-bold">100% Authentic</h3>
                <p className="text-gray-700">Direct from mountain farms at 8,000+ ft elevation. No middlemen, no compromises - just pure Himalayan products.</p>
              </div>
              <div className="space-y-4">
                <Mountain className="w-12 h-12 text-blue-600" />
                <h3 className="font-serif text-2xl font-bold">Community Support</h3>
                <p className="text-gray-700">We support mountain farmers and communities, ensuring sustainable practices and fair compensation.</p>
              </div>
            </section>

            {/* Story Section */}
            <section className="bg-gray-50 p-8 rounded-lg space-y-4">
              <h2 className="font-serif text-3xl font-bold mb-6">How It Started</h2>
              <p className="text-gray-700 leading-relaxed">
                The पहाड़ी Company was born from a simple belief: the world deserves access to authentic Himalayan wellness products without compromise. Our founders spent years in the Himalayas, building relationships with local farmers, understanding traditional practices, and discovering the incredible power of mountain-grown products.
              </p>
              <p className="text-gray-700 leading-relaxed">
                What started as a passion project has evolved into a mission to democratize access to premium Himalayan wellness. Every product we sell carries the story of dedicated farmers, generations of wisdom, and unwavering commitment to purity.
              </p>
            </section>

            {/* CTA Section */}
            <section className="text-center py-12">
              <h2 className="font-serif text-3xl font-bold mb-6">Experience Himalayan Wellness</h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Join thousands of customers discovering the transformative power of authentic Himalayan products. Lab-tested, premium quality, direct from the mountains.
              </p>
              <Button 
                size="lg"
                onClick={() => window.location.href = '/products'}
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-12"
              >
                Shop Our Collection <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

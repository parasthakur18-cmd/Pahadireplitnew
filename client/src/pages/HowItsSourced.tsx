import { Leaf, Truck, Award, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { useSEOMeta } from '@/components/SEOMeta';
import farmerPhoto from '@assets/generated_images/honey_sourcing_farmer_photo.png';
import honeyJarMountain from '@assets/generated_images/honey_jar_with_himalayan_mountain_background.png';

export default function HowItsSourced() {
  useSEOMeta({
    title: 'How We Source - The पहाड़ी Company | Pure Himalayan Products',
    description: 'Learn how The Pahadi Company sources authentic Himalayan products directly from mountain farmers. Our commitment to quality, sustainability, and purity.',
    keywords: 'sourcing, organic sourcing, himalayan farming, sustainable practices, farmer partnerships',
    url: window.location.href,
  });

  const sourcingSteps = [
    {
      number: '1',
      title: 'Direct Farmer Partnerships',
      description: 'We work directly with mountain farmers at 8,000+ ft elevation, building long-term relationships based on trust and fair compensation.'
    },
    {
      number: '2',
      title: 'Sustainable Harvesting',
      description: 'Our farmers practice traditional, sustainable harvesting methods that preserve the ecosystem and maximize nutritional content.'
    },
    {
      number: '3',
      title: 'Lab Testing & Certification',
      description: 'Every batch is laboratory tested for purity, potency, and safety. We maintain the highest quality standards in the industry.'
    },
    {
      number: '4',
      title: 'Minimal Processing',
      description: 'We use cold-press and traditional methods to preserve nutrients, enzymes, and natural compounds. No heating, no fillers.'
    },
    {
      number: '5',
      title: 'Eco-Friendly Packaging',
      description: 'Premium sustainable packaging protects products while minimizing environmental impact.'
    },
    {
      number: '6',
      title: 'Direct to You',
      description: 'From farmer to factory to your doorstep - no middlemen, ensuring maximum freshness and authenticity.'
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'How It\'s Sourced' }]} />

        {/* Hero with Image */}
        <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
          <img 
            src={farmerPhoto}
            alt="Mountain Farmer Sourcing"
            className="w-full h-full object-cover"
            data-testid="img-sourcing-hero"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">How We Source</h1>
              <p className="text-lg md:text-xl">Authentic. Sustainable. Direct from the Mountains.</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="space-y-12">
            {/* Our Commitment with Image */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-lg overflow-hidden shadow-lg h-96">
                <img 
                  src={honeyJarMountain}
                  alt="Pure Himalayan Products"
                  className="w-full h-full object-cover"
                  data-testid="img-sourcing-product"
                />
              </div>
              <div className="bg-white p-8 rounded-lg border border-green-100">
                <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                  <Leaf className="w-8 h-8 text-green-600" />
                  Our Commitment
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We believe that authentic products start with authentic relationships. Every product you purchase supports Himalayan farmers, preserves traditional knowledge, and protects mountain ecosystems. We're transparent about our sourcing, rigorous about quality, and committed to sustainability.
                </p>
              </div>
            </div>

            {/* Sourcing Steps */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold">Our Sourcing Process</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {sourcingSteps.map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-700 font-bold text-lg">
                        {step.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why It Matters */}
            <div className="bg-orange-50 p-8 rounded-lg space-y-6">
              <h2 className="font-serif text-3xl font-bold flex items-center gap-3">
                <Award className="w-8 h-8 text-orange-600" />
                Why Our Sourcing Matters
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Maximum Freshness</p>
                    <p className="text-gray-700">Direct from source means fresher, more potent products with higher nutritional content.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Fair Pricing</p>
                    <p className="text-gray-700">By cutting out middlemen, we pay farmers fairly while offering competitive prices to you.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Sustainability</p>
                    <p className="text-gray-700">Supporting traditional farming practices that preserve mountain ecosystems for future generations.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

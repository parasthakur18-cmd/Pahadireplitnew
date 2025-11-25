import { Award, LeafyGreen, Microscope, Package } from "lucide-react";

const badges = [
  {
    icon: Award,
    title: "100% Pure Himalayan",
    description: "Sourced from authentic mountain regions"
  },
  {
    icon: Microscope,
    title: "Lab Tested",
    description: "Quality certified by independent labs"
  },
  {
    icon: LeafyGreen,
    title: "Sustainably Sourced",
    description: "Supporting local farmers & ecology"
  },
  {
    icon: Package,
    title: "Eco Packaging",
    description: "Natural, recyclable materials"
  }
];

export default function TrustBadges() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Why Choose The Pahadi Company</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Our commitment to quality, sustainability, and purity in every product</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div 
                key={index}
                data-testid={`trust-badge-${index}`}
                className="flex flex-col items-center text-center gap-4 p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-orange-500 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="font-semibold text-lg text-white">{badge.title}</h3>
                <p className="text-sm text-gray-300">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div 
                key={index}
                data-testid={`trust-badge-${index}`}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Header from "@/components/Header";
import HeaderModern from "@/components/HeaderModern";
import HeaderLuxury from "@/components/HeaderLuxury";
import HeaderMinimal from "@/components/HeaderMinimal";
import HeaderRustic from "@/components/HeaderRustic";
import HeaderBold from "@/components/HeaderBold";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function HeaderShowcase() {
  const headers = [
    {
      name: "Current Design",
      description: "Warm earth tones with gradient logo and sage accents",
      component: Header,
      code: "import Header from '@/components/Header'"
    },
    {
      name: "Modern & Clean",
      description: "Minimalist with search bar and contemporary feel",
      component: HeaderModern,
      code: "import HeaderModern from '@/components/HeaderModern'"
    },
    {
      name: "Luxury Premium",
      description: "Gradient background with white text, high-end aesthetic",
      component: HeaderLuxury,
      code: "import HeaderLuxury from '@/components/HeaderLuxury'"
    },
    {
      name: "Minimal & Elegant",
      description: "Clean white with bold black text, timeless design",
      component: HeaderMinimal,
      code: "import HeaderMinimal from '@/components/HeaderMinimal'"
    },
    {
      name: "Rustic Authentic",
      description: "Warm orange tones, mountain vibes, organic feel",
      component: HeaderRustic,
      code: "import HeaderRustic from '@/components/HeaderRustic'"
    },
    {
      name: "Bold & Statement",
      description: "Dark bold header with uppercase branding, modern luxury",
      component: HeaderBold,
      code: "import HeaderBold from '@/components/HeaderBold'"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold mb-4">Header Design Showcase</h1>
          <p className="text-lg text-muted-foreground">Choose your favorite design for The Pahadi Company</p>
        </div>

        <div className="space-y-12">
          {headers.map((header, index) => {
            const HeaderComponent = header.component;
            return (
              <Card key={index} className="overflow-hidden" data-testid={`header-showcase-${index}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{header.name}</CardTitle>
                      <CardDescription className="text-base mt-1">{header.description}</CardDescription>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(header.code);
                        alert('Copied to clipboard!');
                      }}
                      data-testid={`button-copy-${index}`}
                      className="gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                  <code className="text-xs bg-muted p-3 rounded-lg block mt-4 text-foreground/70">
                    {header.code}
                  </code>
                </CardHeader>
                <CardContent className="p-0 border-t">
                  <HeaderComponent cartItemCount={2} onCartClick={() => console.log('Cart clicked')} />
                  <div className="h-24 bg-muted/30 flex items-center justify-center text-muted-foreground text-sm">
                    Scroll up to see full header
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
          <h2 className="font-semibold text-lg mb-3">How to Switch Headers</h2>
          <p className="text-muted-foreground mb-4">To use a different header design:</p>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Copy the import code from above</li>
            <li>Go to <code className="bg-background px-2 py-1 rounded text-foreground">client/src/pages/Home.tsx</code></li>
            <li>Replace the import at the top</li>
            <li>Replace the <code className="bg-background px-2 py-1 rounded text-foreground">&lt;Header /&gt;</code> component with your chosen header</li>
            <li>Same for ProductDetail.tsx and any other pages</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  review: string;
}

export default function TestimonialCard({ name, location, rating, review }: TestimonialCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card data-testid={`card-testimonial-${name.toLowerCase().replace(/\s/g, '-')}`}>
      <CardContent className="p-6">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i}
              className={`w-4 h-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted'}`}
              data-testid={`star-${i}`}
            />
          ))}
        </div>
        
        <p className="text-sm leading-relaxed mb-6 text-foreground" data-testid="text-review">
          "{review}"
        </p>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm" data-testid="text-name">{name}</p>
            <p className="text-xs text-muted-foreground" data-testid="text-location">{location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
    <Card className="hover-elevate border-gray-200 shadow-sm" data-testid={`card-testimonial-${name.toLowerCase().replace(/\s/g, '-')}`}>
      <CardContent className="p-7">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i}
              className={`w-4 h-4 ${i < rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`}
              data-testid={`star-${i}`}
            />
          ))}
        </div>
        
        <p className="text-base leading-relaxed mb-6 text-gray-700 italic" data-testid="text-review">
          "{review}"
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <Avatar>
            <AvatarFallback className="bg-orange-100 text-orange-600 font-bold text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-gray-900" data-testid="text-name">{name}</p>
            <p className="text-xs text-gray-500" data-testid="text-location">{location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

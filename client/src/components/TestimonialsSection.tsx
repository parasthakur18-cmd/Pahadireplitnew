import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    review: "The honey is absolutely pure and delicious. You can taste the difference in quality. My family loves it!"
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    review: "Best ghee I've ever had. Authentic taste that reminds me of my grandmother's homemade ghee. Worth every rupee."
  },
  {
    name: "Anjali Patel",
    location: "Bangalore, Karnataka",
    rating: 5,
    review: "The herbal tea is amazing! Helps with immunity and tastes wonderful. Great packaging and fast delivery too."
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" data-testid="text-testimonials-title">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of happy customers experiencing Himalayan purity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

import TestimonialCard from '../TestimonialCard';

export default function TestimonialCardExample() {
  return (
    <div className="max-w-md">
      <TestimonialCard
        name="Priya Sharma"
        location="Mumbai, Maharashtra"
        rating={5}
        review="The honey is absolutely pure and delicious. You can taste the difference in quality. My family loves it!"
      />
    </div>
  );
}

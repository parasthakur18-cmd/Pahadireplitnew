import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import type { Review } from '@shared/schema';

interface ReviewSectionProps {
  productId: string;
  sessionId: string;
}

export default function ReviewSection({ productId, sessionId }: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ customerName: '', rating: 5, title: '', content: '' });
  const queryClient = useQueryClient();

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: [`/api/reviews/${productId}`],
  });

  const addReviewMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, productId, sessionId })
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/reviews/${productId}`] });
      setFormData({ customerName: '', rating: 5, title: '', content: '' });
      setShowForm(false);
    }
  });

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6 mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl font-bold">Customer Reviews</h3>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.round(parseFloat(avgRating as string)) ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-600">{avgRating} ({reviews.length} reviews)</span>
        </div>
      </div>

      {!showForm ? (
        <Button onClick={() => setShowForm(true)} variant="outline" className="w-full" data-testid="button-add-review">
          Write a Review
        </Button>
      ) : (
        <Card className="p-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              data-testid="input-customer-name"
            />
            <input
              type="text"
              placeholder="Review title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              data-testid="input-review-title"
            />
            <div>
              <label className="block text-sm font-semibold mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    data-testid={`button-star-${star}`}
                  >
                    <Star
                      className={`w-6 h-6 cursor-pointer ${formData.rating >= star ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              placeholder="Your review"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border rounded-md min-h-[100px]"
              data-testid="textarea-review"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => addReviewMutation.mutate(formData)}
                disabled={addReviewMutation.isPending}
                className="flex-1 bg-green-600 hover:bg-green-700"
                data-testid="button-submit-review"
              >
                Submit Review
              </Button>
              <Button
                onClick={() => setShowForm(false)}
                variant="outline"
                className="flex-1"
                data-testid="button-cancel-review"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} data-testid={`card-review-${review.id}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{review.title}</p>
                  <p className="text-sm text-gray-500">{review.customerName}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

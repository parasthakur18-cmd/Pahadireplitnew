import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WishlistButtonProps {
  productId: string;
  sessionId: string;
  productName: string;
}

export default function WishlistButton({ productId, sessionId, productName }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    const checkWishlist = async () => {
      const res = await fetch(`/api/wishlist/check/${productId}/${sessionId}`);
      const data = await res.json();
      setIsInWishlist(data.inWishlist);
    };
    checkWishlist();
  }, [productId, sessionId]);

  const addToWishlist = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, sessionId })
      });
      return res.json();
    },
    onSuccess: (data) => {
      setIsInWishlist(true);
      setWishlistId(data.id);
      queryClient.invalidateQueries({ queryKey: [`/api/wishlist/${sessionId}`] });
      toast({ description: `${productName} added to wishlist!` });
    }
  });

  const removeFromWishlist = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/wishlist/${wishlistId}`, { method: 'DELETE' });
      return res.json();
    },
    onSuccess: () => {
      setIsInWishlist(false);
      setWishlistId(null);
      queryClient.invalidateQueries({ queryKey: [`/api/wishlist/${sessionId}`] });
      toast({ description: `${productName} removed from wishlist` });
    }
  });

  const handleClick = () => {
    if (isInWishlist) {
      removeFromWishlist.mutate();
    } else {
      addToWishlist.mutate();
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      disabled={addToWishlist.isPending || removeFromWishlist.isPending}
      data-testid="button-wishlist"
      className={isInWishlist ? 'bg-red-50 text-red-600' : ''}
    >
      <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
    </Button>
  );
}

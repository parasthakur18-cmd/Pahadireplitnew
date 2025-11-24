import Cart from '../Cart';
import { Button } from '@/components/ui/button';
import honeyImage from '@assets/generated_images/himalayan_wildflower_honey_product.png';
import gheeImage from '@assets/generated_images/pahadi_desi_ghee_product.png';

export default function CartExample() {
  const sampleItems = [
    {
      id: '1',
      name: 'Himalayan Wildflower Honey',
      slug: 'honey',
      tagline: 'Raw honey',
      description: 'Pure honey',
      price: '599',
      weight: '500g',
      image: honeyImage,
      category: 'honey',
      inStock: 10,
      benefits: [],
      ingredients: 'Honey',
      usage: 'Daily',
      quantity: 2,
    },
    {
      id: '2',
      name: 'Pahadi Desi Ghee',
      slug: 'ghee',
      tagline: 'Pure ghee',
      description: 'Grass-fed ghee',
      price: '799',
      weight: '500g',
      image: gheeImage,
      category: 'ghee',
      inStock: 5,
      benefits: [],
      ingredients: 'Ghee',
      usage: 'Cooking',
      quantity: 1,
    },
  ];

  return (
    <Cart
      items={sampleItems}
      onUpdateQuantity={(id, qty) => console.log('Update quantity:', id, qty)}
      onRemoveItem={(id) => console.log('Remove item:', id)}
      onCheckout={() => console.log('Checkout clicked')}
    >
      <Button>Open Cart</Button>
    </Cart>
  );
}

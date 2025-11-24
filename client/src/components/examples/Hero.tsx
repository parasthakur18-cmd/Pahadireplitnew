import Hero from '../Hero';

export default function HeroExample() {
  return (
    <div className="min-h-screen">
      <Hero 
        onShopClick={() => console.log('Shop Now clicked')}
        onStoryClick={() => console.log('Our Story clicked')}
      />
    </div>
  );
}

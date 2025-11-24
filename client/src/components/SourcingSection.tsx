import farmerImage from '@assets/generated_images/honey_sourcing_farmer_photo.png';

export default function SourcingSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" data-testid="text-sourcing-title">
            How It's Sourced
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every product tells a story of tradition, sustainability, and the people behind it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h3 className="font-serif text-2xl font-semibold mb-4">
              Direct from Mountain Villages
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We work directly with small-scale farmers and producers in remote Himalayan villages. Every jar of honey, every batch of ghee comes from families who have perfected their craft over generations.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By cutting out middlemen, we ensure fair prices for producers and authentic quality for you.
            </p>
          </div>
          <div className="order-1 md:order-2 rounded-lg overflow-hidden">
            <img 
              src={farmerImage}
              alt="Himalayan farmer harvesting honey"
              className="w-full h-[400px] object-cover"
              data-testid="img-sourcing-farmer"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h4 className="font-semibold mb-2">Traditional Methods</h4>
            <p className="text-sm text-muted-foreground">
              Time-honored techniques passed down through generations
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h4 className="font-semibold mb-2">Quality Testing</h4>
            <p className="text-sm text-muted-foreground">
              Every batch tested for purity and authenticity
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h4 className="font-semibold mb-2">To Your Door</h4>
            <p className="text-sm text-muted-foreground">
              Carefully packaged and delivered fresh to you
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

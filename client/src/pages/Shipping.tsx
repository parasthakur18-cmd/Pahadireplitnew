import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { useSEOMeta } from '@/components/SEOMeta';
import { Truck, Clock, RotateCcw } from 'lucide-react';

export default function Shipping() {
  useSEOMeta({
    title: 'Shipping & Returns - The पहाड़ी Company',
    description: 'Learn about our shipping and return policies. Fast, reliable delivery of authentic Himalayan products.',
    url: window.location.href,
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shipping & Returns' }]} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-serif text-4xl font-bold mb-8">Shipping & Returns</h1>
          
          <div className="space-y-8">
            <section className="bg-orange-50 p-8 rounded-lg">
              <div className="flex items-start gap-4 mb-4">
                <Truck className="w-8 h-8 text-orange-600 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
                  <p className="text-gray-700 leading-relaxed">We offer free shipping on all orders above ₹999. For orders below ₹999, a flat shipping charge of ₹50 applies.</p>
                </div>
              </div>
            </section>

            <section className="bg-blue-50 p-8 rounded-lg">
              <div className="flex items-start gap-4 mb-4">
                <Clock className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Delivery Timeline</h2>
                  <ul className="space-y-3 text-gray-700">
                    <li><strong>Metro Cities:</strong> 2-3 business days</li>
                    <li><strong>Tier-2 Cities:</strong> 3-5 business days</li>
                    <li><strong>Remote Areas:</strong> 5-7 business days</li>
                    <li>Orders are processed Monday to Friday, excluding public holidays</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-green-50 p-8 rounded-lg">
              <div className="flex items-start gap-4 mb-4">
                <RotateCcw className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Returns & Refunds</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">We want you to be completely satisfied with your purchase. If you're not happy, here's our return policy:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 30-day money-back guarantee on all products</li>
                    <li>• No questions asked if the product is unopened</li>
                    <li>• For opened products, we accept returns if there are quality issues</li>
                    <li>• Free return shipping on defective or damaged products</li>
                    <li>• Refunds processed within 5-7 business days after receipt</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">How to Initiate a Return</h2>
              <p className="text-gray-700">Contact us at <a href="https://wa.me/919001949260" className="text-orange-600 hover:underline">+91 90019 49260</a> via WhatsApp with:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Your order number</li>
                <li>Reason for return</li>
                <li>Photos (if applicable)</li>
              </ul>
              <p className="text-gray-700 mt-4">We'll provide you with a return label and process your refund once we receive the product.</p>
            </section>

            <section className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
              <p className="text-gray-700">Once your order ships, you'll receive a tracking number via email/WhatsApp. Track your package in real-time on the courier's website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-700">For shipping or return questions, contact us anytime:</p>
              <p className="font-semibold text-gray-900 mt-2">WhatsApp: +91 90019 49260<br/>Email: contact@pahadi.com</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

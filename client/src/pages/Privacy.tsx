import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { useSEOMeta } from '@/components/SEOMeta';

export default function Privacy() {
  useSEOMeta({
    title: 'Privacy Policy - The पहाड़ी Company',
    description: 'Privacy Policy for The Pahadi Company. Learn how we protect your personal information.',
    url: window.location.href,
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-serif text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p>At The पहाड़ी Company, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p>We collect information you provide directly, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and email address</li>
                <li>Shipping address and contact number</li>
                <li>Order history and preferences</li>
                <li>Payment information (processed securely)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and deliver your orders</li>
                <li>Send you updates about your purchases</li>
                <li>Improve our products and services</li>
                <li>Send promotional content (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or destruction.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Third-Party Sharing</h2>
              <p>We do not sell or share your personal information with third parties, except as required by law or with your explicit consent.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal information. Contact us at contact@pahadi.com for any requests.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
              <p>For privacy-related questions, please contact us at:</p>
              <p className="font-semibold">Email: contact@pahadi.com<br/>Phone: +91 90019 49260</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

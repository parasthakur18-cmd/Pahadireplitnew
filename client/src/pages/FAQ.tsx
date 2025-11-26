import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { useSEOMeta } from '@/components/SEOMeta';
import { ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useSEOMeta({
    title: 'FAQ - The पहाड़ी Company',
    description: 'Frequently Asked Questions about The Pahadi Company products, shipping, and ordering.',
    url: window.location.href,
  });

  const faqs = [
    {
      question: 'Are your products organic and certified?',
      answer: 'Yes! All our products are sourced from organic Himalayan farms at 8,000+ feet elevation. Every batch is laboratory tested for purity and quality. While we follow organic practices, specific certification varies by product. Contact us for detailed certification information.'
    },
    {
      question: 'How do I place an order?',
      answer: 'You can order directly from our website by browsing products and adding them to your cart. Then complete checkout with your delivery details. Alternatively, order via WhatsApp at +91 90019 49260 and we\'ll guide you through the process.'
    },
    {
      question: 'What is the return policy?',
      answer: 'We offer a 30-day money-back guarantee on all products. If unopened, returns are accepted without questions. For opened products, we accept returns if there are quality issues. Contact us to initiate a return.'
    },
    {
      question: 'How are orders shipped?',
      answer: 'Orders ship via reputable couriers (FedEx, DHL, India Post). Metro cities receive delivery in 2-3 days, while remote areas may take 5-7 days. You\'ll receive a tracking number once your order ships.'
    },
    {
      question: 'Do you offer free shipping?',
      answer: 'Yes! Free shipping on orders above ₹999. For orders below ₹999, a flat shipping charge of ₹50 applies across India.'
    },
    {
      question: 'How should I store the products?',
      answer: 'Store products in cool, dry places away from direct sunlight. Most products come with storage instructions on the packaging. Unopened products maintain quality for 2+ years when stored properly.'
    },
    {
      question: 'Are the products suitable for dietary restrictions?',
      answer: 'Most of our products are naturally vegan, gluten-free, and free from artificial additives. Check individual product descriptions for specific details. We also provide complete ingredient lists.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can reach us via WhatsApp at +91 90019 49260 (fastest response), or email at contact@pahadi.com. We respond to all inquiries within 24 hours.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we ship only within India. For international orders, please contact us at contact@pahadi.com and we\'ll explore options with you.'
    },
    {
      question: 'What makes your products different?',
      answer: 'We source directly from mountain farmers at 8,000+ feet elevation, skip all middlemen, ensure every batch is lab-tested, use minimal processing to preserve nutrients, and support sustainable farming practices. It\'s authentic Himalayan wellness without compromise.'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-serif text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 mb-8">Find answers to common questions about our products, shipping, and service.</p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                  data-testid={`button-faq-${index}`}
                >
                  <h3 className="font-semibold text-left text-gray-900">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-600 flex-shrink-0 ml-4 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-orange-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-700 mb-4">Contact us anytime! We love hearing from our customers.</p>
            <div className="space-y-2 text-gray-900">
              <p><strong>WhatsApp:</strong> <a href="https://wa.me/919001949260" className="text-orange-600 hover:underline">+91 90019 49260</a></p>
              <p><strong>Email:</strong> contact@pahadi.com</p>
              <p><strong>Hours:</strong> 10 AM - 6 PM IST, Monday to Saturday</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

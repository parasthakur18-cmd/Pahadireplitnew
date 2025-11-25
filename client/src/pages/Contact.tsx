import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { useSEOMeta } from '@/components/SEOMeta';

export default function Contact() {
  useSEOMeta({
    title: 'Contact Us - The पहाड़ी Company | Himalayan Products Support',
    description: 'Get in touch with The Pahadi Company. Questions about products? Need support? Contact us via WhatsApp, email, or contact form.',
    keywords: 'contact pahadi company, customer support, himalayan products',
    url: window.location.href,
  });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
            <p className="text-lg text-gray-700">We'd love to hear from you. Questions? Feedback? Let's connect!</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <div className="space-y-8">
              <h2 className="font-serif text-3xl font-bold">Contact Information</h2>
              
              {/* WhatsApp */}
              <div className="flex gap-4 items-start">
                <div className="bg-green-100 p-4 rounded-full">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
                  <p className="text-gray-700 mb-3">Chat with us on WhatsApp for quick support and product inquiries</p>
                  <Button
                    onClick={() => window.open('https://wa.me/919001949260', '_blank')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Chat on WhatsApp
                  </Button>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p className="text-gray-700">support@pahadi.com</p>
                  <p className="text-gray-500 text-sm">We respond within 24 hours</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 items-start">
                <div className="bg-orange-100 p-4 rounded-full">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Based in the Himalayas</h3>
                  <p className="text-gray-700">Sourcing authentic products directly from mountain communities</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="font-serif text-3xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                    data-testid="input-contact-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                    data-testid="input-contact-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 resize-none"
                    data-testid="textarea-contact-message"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold"
                  data-testid="button-contact-submit"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                {submitted && (
                  <p className="text-green-600 text-center font-semibold" data-testid="text-contact-success">
                    Message sent! We'll get back to you soon.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

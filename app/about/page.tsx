import { getDesignData } from '@/lib/design';
import { getVersionInfo } from '@/lib/version';
import Link from 'next/link';

export default function AboutPage() {
  const design = getDesignData();
  const versionInfo = getVersionInfo();

  const faqs = [
    {
      question: 'Who should I contact for questions?',
      answer: (
        <div>
          <p className="mb-2">
            <strong>For general questions, please contact Samantha Sacks:</strong>
          </p>
          <p className="mb-1">
            Email:{' '}
            <a
              href="mailto:s.sacks@lrparis.com"
              className="underline hover:opacity-80"
              style={{ color: design.colors.secondary }}
            >
              s.sacks@lrparis.com
            </a>
          </p>
          <p className="mb-4">Phone: +386 562 8359</p>
          <p className="mb-2">
            <strong>For finance-related questions:</strong>
          </p>
          <p>
            Email:{' '}
            <a
              href="mailto:finance@lrparis.com"
              className="underline hover:opacity-80"
              style={{ color: design.colors.secondary }}
            >
              finance@lrparis.com
            </a>
          </p>
        </div>
      ),
    },
    {
      question: 'How do I pay for my product?',
      answer: (
        <div>
          <p className="mb-3">
            Once you have checked out via the website, please send a purchase order to{' '}
            <a
              href="mailto:s.sacks@lrparis.com"
              className="underline hover:opacity-80"
              style={{ color: design.colors.secondary }}
            >
              s.sacks@lrparis.com
            </a>{' '}
            if your hotel requires that for invoice.
          </p>
          <p>
            We will then send over an invoice for 100% of the total. The invoice will include
            shipping and taxes.
          </p>
        </div>
      ),
    },
    {
      question: 'How much does shipping cost?',
      answer: (
        <p>Shipping is calculated based on your location and the items in your order.</p>
      ),
    },
    {
      question: 'What payment options do you support?',
      answer: <p>Invoice, ACH, Wire.</p>,
    },
    {
      question: 'Where can I find a copy of your W9 for future use?',
      answer: (
        <p>
          Please visit{' '}
          <a
            href="#"
            className="underline hover:opacity-80"
            style={{ color: design.colors.secondary }}
          >
            this link
          </a>{' '}
          to see our W9 and Banking Back up information.
        </p>
      ),
    },
    {
      question: 'How can I order less than one case?',
      answer: <p>We cannot support orders smaller than one case.</p>,
    },
    {
      question: 'How can I place a custom order for my hotel in the future?',
      answer: (
        <div>
          <p className="mb-2">
            Please contact Samantha Sacks to place a custom order for your hotel:
          </p>
          <p className="mb-1">
            Email:{' '}
            <a
              href="mailto:s.sacks@lrparis.com"
              className="underline hover:opacity-80"
              style={{ color: design.colors.secondary }}
            >
              s.sacks@lrparis.com
            </a>
          </p>
          <p>Phone: +386 562 8359</p>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* About Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-6" style={{ color: design.colors.primary }}>
          About {design.companyName}
        </h1>
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed mb-4" style={{ color: design.colors.text }}>
            {design.descriptions.about}
          </p>
          <p className="text-lg leading-relaxed" style={{ color: design.colors.text }}>
            We are committed to providing exceptional wholesale products and outstanding service
            to our business partners. Our streamlined ordering system makes it easy to browse,
            select, and purchase products for your business needs.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8" style={{ color: design.colors.primary }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-8 max-w-4xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b pb-6"
              style={{ borderColor: design.colors.border }}
            >
              <h3 className="text-xl font-semibold mb-3" style={{ color: design.colors.primary }}>
                {faq.question}
              </h3>
              <div className="text-base leading-relaxed" style={{ color: design.colors.text }}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* System Information */}
      <section className="mb-8">
        <div
          className="border rounded-lg p-6 max-w-2xl"
          style={{ borderColor: design.colors.border, backgroundColor: '#f9fafb' }}
        >
          <h3 className="text-lg font-semibold mb-3" style={{ color: design.colors.primary }}>
            System Information
          </h3>
          <div className="space-y-2 text-sm" style={{ color: design.colors.textLight }}>
            <p>
              <strong>Platform:</strong> {versionInfo.name}
            </p>
            <p>
              <strong>Version:</strong> {versionInfo.version}
            </p>
            <p>
              <strong>Built with:</strong>{' '}
              <span style={{ color: design.colors.secondary }} className="font-semibold">
                LR Paris Shuttle
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="mt-12">
        <Link
          href="/"
          className="inline-block px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: design.colors.secondary }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

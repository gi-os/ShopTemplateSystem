'use client';

import { getDesignData, getFAQData } from '@/lib/design';
import { getVersionInfo } from '@/lib/version';
import Link from 'next/link';
import { useState } from 'react';

// Helper function to format FAQ answer text with email links
function formatAnswer(answer: string, secondaryColor: string) {
  // Split by lines to preserve formatting
  const lines = answer.split('\n');

  return lines.map((line, lineIndex) => {
    // Skip empty lines but preserve spacing
    if (!line.trim()) {
      return <br key={`br-${lineIndex}`} />;
    }

    // Check if line contains email
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const parts = line.split(emailRegex);

    // Process line parts (text and emails)
    const processedLine = parts.map((part, partIndex) => {
      // Check if this part is an email
      if (emailRegex.test(part)) {
        emailRegex.lastIndex = 0; // Reset regex
        return (
          <a
            key={`email-${lineIndex}-${partIndex}`}
            href={`mailto:${part}`}
            className="underline hover:opacity-80"
            style={{ color: secondaryColor }}
          >
            {part}
          </a>
        );
      }
      return part;
    });

    return (
      <p key={`line-${lineIndex}`} className="mb-2">
        {processedLine}
      </p>
    );
  });
}

export default function AboutPage() {
  const design = getDesignData();
  const versionInfo = getVersionInfo();
  const faqs = getFAQData();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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

      {/* FAQ Section with Accordion */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8" style={{ color: design.colors.primary }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-4xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden"
              style={{ borderColor: design.colors.border }}
            >
              {/* Question - Clickable Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-semibold pr-4" style={{ color: design.colors.primary }}>
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 flex-shrink-0 transition-transform ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}
                  style={{ color: design.colors.primary }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Answer - Collapsible Content */}
              {openFAQ === index && (
                <div
                  className="px-6 py-4 border-t"
                  style={{ borderColor: design.colors.border }}
                >
                  <div className="text-base leading-relaxed" style={{ color: design.colors.text }}>
                    {formatAnswer(faq.answer, design.colors.secondary)}
                  </div>
                </div>
              )}
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

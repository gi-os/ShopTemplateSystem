'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DesignData {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textLight: string;
    border: string;
    success: string;
  };
  fonts: {
    titleFont: string;
    bodyFont: string;
  };
  style: {
    cornerRadius: number;
  };
  companyName: string;
}

export default function SecretPage() {
  const [design, setDesign] = useState<DesignData | null>(null);

  useEffect(() => {
    fetch('/api/design')
      .then(r => r.json())
      .then(setDesign)
      .catch(console.error);
  }, []);

  if (!design) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1
          className="text-5xl font-bold mb-8"
          style={{
            color: design.colors.primary,
            fontFamily: design.fonts.titleFont,
          }}
        >
          🎉 You Found the Easter Egg! 🥚
        </h1>

        <div
          className="border p-8 mb-8"
          style={{
            borderColor: design.colors.border,
            backgroundColor: design.colors.background,
            borderRadius: `${design.style.cornerRadius}px`,
          }}
        >
          <div className="mb-6">
            <img
              src="/basil-cat.jpg"
              alt="Basil the Cat"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
              style={{ borderRadius: `${design.style.cornerRadius}px` }}
            />
          </div>

          <p
            className="text-2xl font-semibold mb-4"
            style={{
              color: design.colors.primary,
              fontFamily: design.fonts.titleFont,
            }}
          >
            Meet Basil! 🐱
          </p>

          <p
            className="text-xl mb-6"
            style={{
              color: design.colors.text,
              fontFamily: design.fonts.bodyFont,
            }}
          >
            Shuttle built by <span className="font-bold">Giovanni</span> and <span className="font-bold">Basil</span>
          </p>

          <p
            className="text-sm italic"
            style={{
              color: design.colors.textLight,
              fontFamily: design.fonts.bodyFont,
            }}
          >
            (Yes, Basil the cat is a co-developer. He specializes in keyboard testing and moral support.)
          </p>
        </div>

        <Link
          href="/"
          className="inline-block px-6 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: design.colors.secondary,
            borderRadius: `${design.style.cornerRadius}px`,
            fontFamily: design.fonts.bodyFont,
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

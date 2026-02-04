import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const placeholderPath = path.join(process.cwd(), 'DATABASE', 'Design', 'Logos', 'placeholder.svg');

    if (fs.existsSync(placeholderPath)) {
      const fileBuffer = fs.readFileSync(placeholderPath);
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // Fallback SVG if placeholder doesn't exist
    const fallbackSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
        <rect width="400" height="400" fill="#E5E7EB"/>
        <text x="200" y="180" font-family="Arial" font-size="60" fill="#9CA3AF" text-anchor="middle">🐱</text>
        <text x="200" y="230" font-family="Arial" font-size="18" fill="#6B7280" text-anchor="middle">Image Coming Soon</text>
      </svg>
    `;

    return new NextResponse(fallbackSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}

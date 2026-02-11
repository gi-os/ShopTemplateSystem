import { NextResponse } from 'next/server';
import { getDesignData } from '@/lib/design';

// Disable caching for this route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const design = getDesignData();
    return NextResponse.json(design);
  } catch (error) {
    console.error('Error fetching design data:', error);
    return NextResponse.json(
      { error: 'Failed to load design data' },
      { status: 500 }
    );
  }
}

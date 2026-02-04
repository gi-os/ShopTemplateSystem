import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string; filename: string }> }
) {
  try {
    const { productId, filename } = await params;

    // Parse productId to get collection and item paths
    // productId format: "collection-slug-item-slug"
    const parts = productId.split('-');
    if (parts.length < 2) {
      return new NextResponse('Invalid product ID', { status: 400 });
    }

    // We need to find the actual collection and item folders
    const collectionsPath = path.join(process.cwd(), 'DATABASE', 'ShopCollections');
    const collections = fs.readdirSync(collectionsPath, { withFileTypes: true });

    let imagePath: string | null = null;

    for (const collection of collections) {
      if (!collection.isDirectory()) continue;

      const collectionPath = path.join(collectionsPath, collection.name);
      const items = fs.readdirSync(collectionPath, { withFileTypes: true });

      for (const item of items) {
        if (!item.isDirectory()) continue;

        const photosPath = path.join(collectionPath, item.name, 'Photos', filename);
        if (fs.existsSync(photosPath)) {
          imagePath = photosPath;
          break;
        }
      }

      if (imagePath) break;
    }

    if (!imagePath) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(imagePath);
    const ext = path.extname(filename).toLowerCase();

    let contentType = 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving product image:', error);
    return new NextResponse('Error loading image', { status: 500 });
  }
}

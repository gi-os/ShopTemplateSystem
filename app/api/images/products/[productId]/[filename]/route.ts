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
    const collectionsPath = path.join(process.cwd(), 'DATABASE', 'ShopCollections');
    const collections = fs.readdirSync(collectionsPath, { withFileTypes: true });

    let imagePath: string | null = null;

    function slugify(text: string): string {
      return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    // Search for the matching product by checking if the productId matches
    for (const collection of collections) {
      if (!collection.isDirectory()) continue;

      const collectionSlug = slugify(collection.name);
      const collectionPath = path.join(collectionsPath, collection.name);
      const items = fs.readdirSync(collectionPath, { withFileTypes: true });

      for (const item of items) {
        if (!item.isDirectory()) continue;

        const itemSlug = slugify(item.name);
        const generatedProductId = `${collectionSlug}-${itemSlug}`;

        // Check if this matches the requested productId
        if (generatedProductId === productId) {
          const photosPath = path.join(collectionPath, item.name, 'Photos', filename);
          if (fs.existsSync(photosPath)) {
            imagePath = photosPath;
            break;
          }
        }
      }

      if (imagePath) break;
    }

    if (!imagePath) {
      // Return placeholder image if not found
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

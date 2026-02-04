import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDesignData } from '@/lib/design';
import { getCollection } from '@/lib/catalog';
import ProductGrid from '@/components/ProductGrid';

export default async function CollectionPage({ params }: { params: Promise<{ collectionId: string }> }) {
  const { collectionId } = await params;
  const design = getDesignData();
  const collection = getCollection(collectionId);

  if (!collection) {
    notFound();
  }

  return (
    <div>
      {/* Collection Showcase Photo */}
      {collection.showcasePhoto && (
        <div className="w-full h-64 overflow-hidden">
          <img
            src={collection.showcasePhoto}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/collections"
            className="inline-flex items-center mb-4 hover:opacity-80"
            style={{ color: design.colors.secondary }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Collections
          </Link>
          <h1 className="text-4xl font-bold" style={{ color: design.colors.primary }}>
            {collection.name}
          </h1>
        </div>

        <ProductGrid
          products={collection.products}
          primaryColor={design.colors.primary}
          secondaryColor={design.colors.secondary}
          textColor={design.colors.text}
          textLightColor={design.colors.textLight}
          borderColor={design.colors.border}
        />
      </div>
    </div>
  );
}

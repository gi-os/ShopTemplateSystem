import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDesignData } from '@/lib/design';
import { getCollection } from '@/lib/catalog';

export default async function CollectionPage({ params }: { params: Promise<{ collectionId: string }> }) {
  const { collectionId } = await params;
  const design = getDesignData();
  const collection = getCollection(collectionId);

  if (!collection) {
    notFound();
  }

  return (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {collection.products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            style={{ borderColor: design.colors.border }}
          >
            {product.images.length > 0 ? (
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1" style={{ color: design.colors.primary }}>
                {product.name}
              </h3>
              <p className="text-sm mb-2" style={{ color: design.colors.textLight }}>
                SKU: {product.sku}
              </p>
              <div className="mb-2">
                <p className="text-sm font-semibold" style={{ color: design.colors.text }}>
                  Box of {product.unitsPerBox}
                </p>
                <p className="text-2xl font-bold" style={{ color: design.colors.secondary }}>
                  ${product.boxCost.toFixed(2)}
                </p>
                <p className="text-sm" style={{ color: design.colors.textLight }}>
                  ${product.itemCost.toFixed(2)} per unit
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

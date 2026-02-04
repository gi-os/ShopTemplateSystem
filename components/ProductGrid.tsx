'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  sku: string;
  itemCost: number;
  boxCost: number;
  unitsPerBox: number;
  images: string[];
}

interface ProductGridProps {
  products: Product[];
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  textLightColor: string;
  borderColor: string;
}

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'box-asc' | 'box-desc';

export default function ProductGrid({
  products,
  primaryColor,
  secondaryColor,
  textColor,
  textLightColor,
  borderColor,
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.boxCost - b.boxCost;
      case 'price-desc':
        return b.boxCost - a.boxCost;
      case 'box-asc':
        return a.unitsPerBox - b.unitsPerBox;
      case 'box-desc':
        return b.unitsPerBox - a.unitsPerBox;
      default:
        return 0;
    }
  });

  return (
    <div>
      {/* Sort Controls */}
      <div className="mb-6 flex items-center justify-between">
        <p style={{ color: textColor }}>
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
        <div className="flex items-center space-x-3">
          <label className="text-sm font-semibold" style={{ color: textColor }}>
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor }}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="box-asc">Box Quantity (Low to High)</option>
            <option value="box-desc">Box Quantity (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            style={{ borderColor }}
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
                <img
                  src="/api/images/logos/placeholder.svg"
                  alt="Placeholder"
                  className="w-24 h-24 opacity-50"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1" style={{ color: primaryColor }}>
                {product.name}
              </h3>
              <p className="text-sm mb-2" style={{ color: textLightColor }}>
                SKU: {product.sku}
              </p>
              <div className="mb-2">
                <p className="text-sm font-semibold" style={{ color: textColor }}>
                  Box of {product.unitsPerBox}
                </p>
                <p className="text-2xl font-bold" style={{ color: secondaryColor }}>
                  ${product.boxCost.toFixed(2)}
                </p>
                <p className="text-sm" style={{ color: textLightColor }}>
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

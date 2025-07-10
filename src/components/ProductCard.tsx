// src/components/ProductCard.tsx
'use client';

import Link from 'next/link';
import React from 'react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  deleting: boolean;
  onDelete: (id: string) => void;
  onDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  deleting,
  onDelete,
  onDetails,
}) => {
  return (
    <div className="border p-4 rounded shadow bg-gray-700 text-white">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-300">{product.description}</p>
      <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
      <p className="text-xs text-gray-400 mt-1">{product.category}</p>
      <p className="text-xs mt-1">
        Estado:{' '}
        <span className={product.isActive ? 'text-green-400' : 'text-red-400'}>
          {product.isActive ? 'Activo' : 'Inactivo'}
        </span>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onDetails(product)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Detalles
        </button>
        <Link href={`/edit/${product.id}`}>
          <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Editar
          </button>
        </Link>
        <button
          onClick={() => onDelete(product.id)}
          disabled={deleting}
          className={`px-3 py-1 rounded text-white ${
            deleting ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {deleting ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
};

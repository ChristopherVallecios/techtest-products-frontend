// src/components/ProductDetailsModal.tsx
'use client';

import React from 'react';
import { Product } from '@/types/product';
import { Modal } from './Modal';

interface ProductDetailsModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  product,
  onClose,
}) => {
  if (!isOpen || !product) return null;

  return (
    <Modal
      isOpen={isOpen}
      title={`Detalle de ${product.name}`}
      onConfirm={onClose}
      onCancel={onClose}
    >
      <div className="space-y-2 text-gray-800 dark:text-gray-200">
        <p><strong>ID:</strong> {product.id}</p>
        <p><strong>Nombre:</strong> {product.name}</p>
        <p><strong>Descripción:</strong> {product.description}</p>
        <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
        <p><strong>Categoría:</strong> {product.category}</p>
        <p>
          <strong>Estado:</strong>{' '}
          <span className={product.isActive ? 'text-green-600' : 'text-red-600'}>
            {product.isActive ? 'Activo' : 'Inactivo'}
          </span>
        </p>
        
      </div>
    </Modal>
  );
};

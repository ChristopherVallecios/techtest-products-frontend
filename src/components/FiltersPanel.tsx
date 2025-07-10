// src/components/FiltersPanel.tsx
'use client';

import React from 'react';
import { ProductCategory, ProductQueryParams } from '@/types/product';

interface FiltersPanelProps {
  filters: ProductQueryParams;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ filters, onFilterChange }) => {
  // reutilizamos la clase darkField definida antes
  const darkField =
    'w-full p-2 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400 ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <input
        type="text"
        name="name"
        placeholder="Buscar por nombre"
        value={filters.name ?? ''}
        onChange={onFilterChange}
        className={darkField}
        aria-label="Buscar por nombre"
      />

      <select
        name="category"
        value={filters.category ?? ''}
        onChange={onFilterChange}
        className={darkField}
        aria-label="Filtrar por categoría"
      >
        <option value="">Todas las categorías</option>
        {Object.values(ProductCategory).map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        name="isActive"
        value={
          filters.isActive === undefined
            ? ''
            : filters.isActive
            ? 'true'
            : 'false'
        }
        onChange={onFilterChange}
        className={darkField}
        aria-label="Filtrar por estado"
      >
        <option value="">Todos</option>
        <option value="true">Activos</option>
        <option value="false">Inactivos</option>
      </select>
    </div>
  );
};

// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts, deleteProduct } from '@/services/productService';
import { Product, ProductQueryParams } from '@/types/product';

import { Modal } from '@/components/Modal';
import { FiltersPanel } from '@/components/FiltersPanel';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailsModal } from '@/components/ProductDetailsModal';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductQueryParams>({
    name: '',
    category: undefined,
    isActive: undefined,
    page: 1,
    perPage: 12,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // para borrado
  const [modalOpen, setModalOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);
  // para detalles
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // toggle de filtros en móvil
  const [showFilters, setShowFilters] = useState(false);

  // fetch productos
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getProducts(filters);
        setProducts(res.products);
        setTotalPages(Math.ceil(res.meta.total / (filters.perPage ?? 1)));
      } catch {
        setError('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filters]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]:
        value === ''
          ? undefined
          : name === 'isActive'
          ? value === 'true'
          : value,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) =>
    setFilters(prev => ({ ...prev, page }));

  const confirmDelete = (id: string) => {
    setToDeleteId(id);
    setModalOpen(true);
  };
  const onDeleteConfirmed = async () => {
    if (!toDeleteId) return;
    setModalOpen(false);
    setError('');
    try {
      await deleteProduct(toDeleteId);
      const res = await getProducts(filters);
      setProducts(res.products);
      setTotalPages(Math.ceil(res.meta.total / (filters.perPage ?? 1)));
    } catch {
      setError('Error al eliminar el producto');
    } finally {
      setToDeleteId(null);
    }
  };
  const onCancelDelete = () => {
    setModalOpen(false);
    setToDeleteId(null);
  };

  const onShowDetails = (product: Product) => {
    setSelectedProduct(product);
    setDetailsOpen(true);
  };
  const onCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-900">
      {/* — Modales — */}
      <Modal
        isOpen={modalOpen}
        title="Confirmar eliminación"
        onConfirm={onDeleteConfirmed}
        onCancel={onCancelDelete}
      >
        ¿Estás seguro de que quieres eliminar este producto?
      </Modal>

      <ProductDetailsModal
        isOpen={detailsOpen}
        product={selectedProduct}
        onClose={onCloseDetails}
      />

      {/* — Header + Create + Toggle Filtros — */}
      <div className="bg-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Título + Botones */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h1 className="text-2xl font-semibold text-white">
              Lista de Productos
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
              {/* Filtros (solo en móvil) */}
              <button
                className="sm:hidden w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
                onClick={() => setShowFilters(v => !v)}
              >
                Filtros
              </button>
              {/* Crear Producto */}
              <Link
                href="/create"
                className="block w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded"
              >
                Crear Producto
              </Link>
            </div>
          </div>

          {/* Panel de filtros */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block mt-4`}>
            <FiltersPanel
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {/* — Listado de Cards (scrollable) — */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {loading && <p className="text-gray-400">Cargando...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && products.length === 0 && (
            <p className="text-gray-500">No se encontraron productos.</p>
          )}

          <div
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-2 
              lg:grid-cols-3 
              xl:grid-cols-4 
              gap-6
            "
          >
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                deleting={toDeleteId === product.id && modalOpen}
                onDelete={confirmDelete}
                onDetails={onShowDetails}
              />
            ))}
          </div>
        </div>
      </div>

      {/* — Paginación (fija abajo) — */}
      {totalPages > 1 && (
        <div className="flex-shrink-0 bg-gray-800 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded border ${
                  filters.page === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

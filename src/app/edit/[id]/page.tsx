'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById, updateProduct } from '@/services/productService';
import { Product, ProductCategory, UpdateProductDto } from '@/types/product';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',            
    category: ProductCategory.OTHER,
    isActive: 'true',     
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product: Product = await getProductById(id as string);
        setForm({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          category: product.category,
          isActive: product.isActive.toString(),
        });
      } catch {
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const priceValue = parseFloat(form.price);
    if (
      !form.name.trim() ||
      !form.description.trim() ||
      isNaN(priceValue) ||
      priceValue <= 0
    ) {
      setError('Por favor completa todos los campos correctamente.');
      setSubmitting(false);
      return;
    }

    const updateDto: UpdateProductDto = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: priceValue,
      category: form.category as ProductCategory,
      isActive: form.isActive === 'true',
    };

    try {
      await updateProduct(id as string, updateDto);
      router.push('/');
    } catch {
      setError('Error al actualizar el producto');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="p-4 text-gray-300">Cargando producto...</p>;
  }

  
  const darkField =
    'w-full p-2 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400 ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Editar Producto</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block mb-1 font-medium text-gray-200">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nombre del producto"
            value={form.name}
            onChange={handleChange}
            className={darkField}
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block mb-1 font-medium text-gray-200">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            className={darkField}
            rows={4}
            required
          />
        </div>

        {/* Precio */}
        <div>
          <label htmlFor="price" className="block mb-1 font-medium text-gray-200">
            Precio
          </label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="0.00"
            value={form.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={darkField}
            required
          />
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="category" className="block mb-1 font-medium text-gray-200">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={darkField}
            required
          >
            {Object.values(ProductCategory).map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="isActive" className="block mb-1 font-medium text-gray-200">
            Estado
          </label>
          <select
            id="isActive"
            name="isActive"
            value={form.isActive}
            onChange={handleChange}
            className={darkField}
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {submitting ? 'Actualizando...' : 'Actualizar Producto'}
        </button>
      </form>
    </main>
  );
}

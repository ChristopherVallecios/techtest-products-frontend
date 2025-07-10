'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/services/productService';
import { ProductCategory } from '@/types/product';

export default function CreateProductPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedName = formData.name.trim();
    const trimmedDesc = formData.description.trim();
    const priceValue = parseFloat(formData.price);
    if (
      !trimmedName ||
      !trimmedDesc ||
      isNaN(priceValue) ||
      priceValue <= 0 ||
      !formData.category
    ) {
      setError('Por favor completa todos los campos correctamente.');
      return;
    }

    try {
      await createProduct({
        name: trimmedName,
        description: trimmedDesc,
        price: priceValue,
        category: formData.category as ProductCategory,
      });
      router.push('/');
    } catch {
      setError('Error al crear el producto');
    }
  };


  const darkField =
    'w-full p-2 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400 ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Crear Producto</h1>

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
            value={formData.name}
            onChange={handleChange}
            className={darkField}
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label
            htmlFor="description"
            className="block mb-1 font-medium text-gray-200"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Descripción"
            value={formData.description}
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
            value={formData.price}
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
            value={formData.category}
            onChange={handleChange}
            className={darkField}
            required
          >
            <option value="" disabled>
              Seleccionar categoría
            </option>
            {Object.values(ProductCategory).map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Botón Guardar */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Guardar
        </button>
      </form>
    </main>
  );
}

// src/services/productService.ts

import axios from 'axios';
import {
  Product,
  CreateProductDto,
  UpdateProductDto,
  ProductQueryParams,
  ProductListResponse,
  ProductCategory,
} from '@/types/product';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
});

// Raw types: price viene como string del backend (decimal)
interface RawProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  category: ProductCategory;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface RawListResponse {
  products: RawProduct[];
  meta: { total: number; page: number; perPage: number };
}

// Obtener lista de productos con filtros y paginación
export const getProducts = async (
  params?: ProductQueryParams
): Promise<ProductListResponse> => {
  const response = await api.get<RawListResponse>('/products', { params });
  const { products, meta } = response.data;

  // Convertir price de string a number
  const normalized: Product[] = products.map(p => ({
    ...p,
    price: parseFloat(p.price),
  }));

  return { products: normalized, meta };
};

// Obtener un producto por ID
export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get<RawProduct>(`/products/${id}`);
  const p = response.data;
  return {
    ...p,
    price: parseFloat(p.price),
  };
};

// Crear producto
export const createProduct = async (
  data: CreateProductDto
): Promise<Product> => {
  const response = await api.post<RawProduct>('/products', data);
  const p = response.data;
  return { ...p, price: parseFloat(p.price) };
};

// Actualizar producto
export const updateProduct = async (
  id: string,
  data: UpdateProductDto
): Promise<Product> => {
  const response = await api.patch<RawProduct>(`/products/${id}`, data);
  const p = response.data;
  return { ...p, price: parseFloat(p.price) };
};

// Eliminar producto
export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};

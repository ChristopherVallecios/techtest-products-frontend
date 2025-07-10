// src/types/product.ts

// Enum según el backend
export enum ProductCategory {
  GROCERY = 'GROCERY',
  BEVERAGE = 'BEVERAGE',
  PERSONAL_CARE = 'PERSONAL_CARE',
  HOUSEHOLD = 'HOUSEHOLD',
  ELECTRONICS = 'ELECTRONICS',
  CLOTHING = 'CLOTHING',
  TOYS = 'TOYS',
  STATIONERY = 'STATIONERY',
  OTHER = 'OTHER',
}

// Estructura que devuelve la API
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Lo que envia para crear un producto (POST)
export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  isActive?: boolean;
}

// Lo que envia para actualizar un producto (PATCH)
export type UpdateProductDto = Partial<CreateProductDto>;

// Filtros en /products?name=...&category=...&isActive=true&page=1&perPage=10
export interface ProductQueryParams {
  name?: string;
  category?: ProductCategory;
  isActive?: boolean;
  page?: number;
  perPage?: number;
}

// Estructura de la respuesta de listado
export interface ProductListResponse {
  products: Product[];
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
}

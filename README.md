# techtest-products-frontend 

(backend)

En el DTO de creación de producto (src/products/dto/create-product.dto.ts), se incorporó una nueva propiedad opcional isActive para indicar si el producto está activo o no.

// src/products/dto/create-product.dto.ts

import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductCategory } from '../@types/enums/product-category.enum';


@ApiPropertyOptional({
    description: 'Whether the product is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive?: boolean;



En el DTO de respuesta (src/products/dto/product-summary.dto.ts), se añadió la anotación @Expose() delante de la propiedad isActive:

  @Expose()
  isActive: boolean;


(frontend)

-Instalar dependencias: 
-Configurar variables de entorno
-ejecutar

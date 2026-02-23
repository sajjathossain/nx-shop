import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiResponse, PaginatedResponse, Product, ProductFilter } from '@org/models';
import { ProductsQueryDTO } from './dto/product.dto';
import { ProductsService as ProductsRepository } from '@org/api-products';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) { }
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll(query: ProductsQueryDTO) {
    try {
      const filter: ProductFilter = {};

      if (query.category) {
        filter.category = query.category as string;
      }
      if (query.minPrice) {
        filter.minPrice = Number(query.minPrice);
      }
      if (query.maxPrice) {
        filter.maxPrice = Number(query.maxPrice);
      }
      if (query.inStock !== undefined) {
        filter.inStock = query.inStock;
      }
      if (query.searchTerm) {
        filter.searchTerm = query.searchTerm as string;
      }

      const page = query.page ? Number(query.page) : 1;
      const pageSize = query.pageSize ? Number(query.pageSize) : 10;

      const result = this.productsRepository.getProducts(filter, page, pageSize);

      const response: ApiResponse<PaginatedResponse<Product>> = {
        data: result,
        success: true,
      };

      return response
    } catch {
      const response: ApiResponse<unknown> = {
        data: null,
        success: false,
        error: 'An error occurred while fetching products',
      };
      throw new InternalServerErrorException(response);
    }
  }

  findOne(id: string) {
    try {
      const product = this.productsRepository.getProductById(id);

      if (!product) {
        const response: ApiResponse<unknown> = {
          data: null,
          success: false,
          error: 'Product not found',
        };
        throw new NotFoundException(response);
      }

      const response: ApiResponse<Product> = {
        data: product,
        success: true,
      };
      return response
    } catch {
      const response: ApiResponse<unknown> = {
        data: null,
        success: false,
        error: 'An error occurred while fetching the product',
      };
      throw new InternalServerErrorException(response);
    }
  }

  update(id: number, updateProductDto: unknown) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  getCategories() {
    try {
      const categories = this.productsRepository.getCategories();
      const response: ApiResponse<string[]> = {
        data: categories,
        success: true,
      };
      return response
    } catch {
      const response: ApiResponse<unknown> = {
        data: null,
        success: false,
        error: 'An error occurred while fetching categories',
      };
      throw new InternalServerErrorException(response);
    }
  }
}

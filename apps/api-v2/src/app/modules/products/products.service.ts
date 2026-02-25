import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiResponse, PaginatedResponse, Product } from '@org/models';
import { ProductsQueryDTO } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Between, FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) { }

  create(_createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(query: ProductsQueryDTO) {
    try {
      const filter: FindOptionsWhere<ProductEntity> = {};

      if (query.category) {
        filter.category = query.category;
      }
      if (query.minPrice || query.maxPrice) {
        const minPrice = Number(query.minPrice) || 0;
        const maxPrice = Number(query.maxPrice) || Number.MAX_SAFE_INTEGER;
        filter.price = Between(minPrice, maxPrice)
      }

      if (query.inStock) {
        filter.inStock = query.inStock;
      }

      if (query.searchTerm) {
        filter.name = ILike(`%${query.searchTerm}%`);
        filter.description = ILike(`%${query.searchTerm}%`);
        filter.category = ILike(`%${query.searchTerm}%`);
      }

      const page = query.page ? Number(query.page) : 1;
      const pageSize = query.pageSize ? Number(query.pageSize) : 10;
      const skip = (page - 1) * pageSize;

      const [result, total] = await this.productsRepository.findAndCount({
        where: filter,
        skip,
        take: pageSize,
      })
      this.logger.log(`Products found: ${total}`);

      const response: ApiResponse<PaginatedResponse<Product>> = {
        data: {
          items: result,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
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

  async findOne(id: string) {
    try {
      const product = await this.productsRepository.findOne({ where: { id } })

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

  async getCategories() {
    try {
      const categories = await this.productsRepository.query<{ category: string }[]>(`SELECT DISTINCT category FROM product`);
      const response: ApiResponse<string[]> = {
        data: categories.map(category => category.category),
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

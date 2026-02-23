import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsService as ProductRepository } from '@org/api-products';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
})
export class ProductsModule { }

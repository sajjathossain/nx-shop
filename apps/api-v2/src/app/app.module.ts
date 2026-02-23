import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { APP_FILTER, BaseExceptionFilter } from '@nestjs/core';

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: BaseExceptionFilter,
  }],
})
export class AppModule { }

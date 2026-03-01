import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { APP_FILTER, BaseExceptionFilter } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvSchema, TEnv } from './config/env.schema';
import { ProductEntity } from './modules/products/entities/product.entity';
import { CategoryModule } from './modules/category/category.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: config => {
        const parsed = EnvSchema.safeParse(config);
        if (!parsed.success) {
          console.error(parsed.error.errors);
          throw new Error('Invalid environment variables');
        }

        return parsed.data;
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<TEnv>) => {
        return {
          type: 'postgres',
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          autoLoadEntities: true,
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_DATABASE'),
          entities: [ProductEntity],
          subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
          synchronize: config.get('DB_SYNCHRONIZE'),
        };
      },
      inject: [ConfigService],
    }),
    ProductsModule,
    CategoryModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: BaseExceptionFilter,
  }],
})
export class AppModule { }

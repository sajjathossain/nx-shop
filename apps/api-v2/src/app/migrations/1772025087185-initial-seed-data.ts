import { ProductsService } from "@org/api-products";
import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSeedData1772025087185 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const productService = new ProductsService()
    const products = productService.getProducts()
    for (const product of products.items) {
      await queryRunner.query(`INSERT INTO product (name, description, price, category, image_url, in_stock, rating, review_count, created_at, updated_at) VALUES ('${product.name}', '${product.description}', ${product.price}, '${product.category}', '${product.imageUrl}', ${product.inStock}, ${product.rating}, ${product.reviewCount}, now(), now())`)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM product`)
  }
}

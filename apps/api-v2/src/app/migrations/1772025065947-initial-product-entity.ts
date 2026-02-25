import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialProductEntity1772025065947 implements MigrationInterface {
  name = 'InitialProductEntity1772025065947'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying(255) NOT NULL, "price" integer NOT NULL, "category" character varying(255) NOT NULL, "image_url" character varying(255) NOT NULL, "in_stock" boolean NOT NULL DEFAULT false, "rating" integer NOT NULL, "review_count" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
  }

}

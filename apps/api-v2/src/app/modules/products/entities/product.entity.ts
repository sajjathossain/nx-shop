import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "product" })
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column({ type: "int" })
  price: number;

  @Column({ length: 255 })
  category: string;

  @Column({ length: 255, name: "image_url" })
  imageUrl: string;

  @Column({ type: "boolean", name: "in_stock", default: false })
  inStock: boolean;

  @Column({ type: "int" })
  rating: number;

  @Column({ type: "int", default: 0, name: "review_count" })
  reviewCount: number;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt: string;

  @Column({ type: "timestamptz", name: "updated_at" })
  updatedAt: string;
}

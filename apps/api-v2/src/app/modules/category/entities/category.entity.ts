import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "category" })
export class CategoryEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ length: 255 })
  title: string

  @Column({ type: "boolean", default: false, name: 'is_deleted' })
  isDeleted: boolean

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt: string

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt: string

  @ManyToOne((type) => CategoryEntity, (category) => category.children)
  @JoinColumn({ name: "parent_id" })
  parent: CategoryEntity

  @OneToMany((type) => CategoryEntity, (category) => category.parent)
  children: CategoryEntity[]
}

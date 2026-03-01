import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ILike, Repository } from 'typeorm';
import { CreateCategoriesDTO, FindQueryQueryDTO, UpdateCategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {
  }
  async create(createCategoriesDto: CreateCategoriesDTO) {
    try {
      const created = this.categoryRepository.create(createCategoriesDto.categories)
      const saved = await this.categoryRepository.save(created)
      return saved
    } catch (error) {
      this.logger.error('Failed to create category')
      console.error({ error })
      throw new InternalServerErrorException("Failed to create category")
    }
  }

  findAll(query: FindQueryQueryDTO) {
    const { parentId, title } = query
    return this.categoryRepository.find({
      where: {
        parent: {
          id: parentId
        },
        title: ILike(`%${title}%`)
      }
    })
  }

  findOne(id: string) {
    return this.categoryRepository.findOne({
      where: {
        id
      }
    })
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDTO) {
    try {

      const findOne = await this.findOne(id)
      const create = this.categoryRepository.create({
        ...findOne,
        ...updateCategoryDto
      })
      const saved = await this.categoryRepository.save(create)
      return saved
    } catch (error) {
      this.logger.error('Failed to update category')
      console.error({ error })
      throw new InternalServerErrorException("Failed to update category")
    }

  }

  async remove(id: string) {
    try {

      const findOne = await this.findOne(id)
      const saved = await this.categoryRepository.save({
        ...findOne,
        isDeleted: true
      })

      return saved
    } catch (error) {
      this.logger.error('Failed to delete category')
      console.error({ error })
      throw new InternalServerErrorException("Failed to delete category")
    }

  }
}

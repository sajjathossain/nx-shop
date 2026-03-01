import { IsArray, IsOptional, IsString, IsUUID, MaxLength, MinLength, ValidateNested } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateCategoryDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string

  @IsString()
  @IsUUID()
  parentId: string
}

export class CreateCategoriesDTO {
  @IsArray()
  @ValidateNested({ each: true })
  categories: CreateCategoryDTO[]
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) { }

export class FindQueryQueryDTO {
  @IsString()
  @IsUUID()
  @IsOptional()
  parentId: string

  @IsString()
  @MinLength(3)
  @IsOptional()
  title: string
}

import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductsQueryDTO {
  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @IsBoolean()
  @IsOptional()
  inStock?: boolean;

  @IsString()
  @IsOptional()
  searchTerm?: string;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  pageSize?: number;
}

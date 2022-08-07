import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('category')
  category(id: string) {
    return this.categoryService.getCategoryById(id);
  }
  @Get('categories')
  categories() {
    return this.categoryService.getCategory();
  }
  @Post('create')
  createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    console.log(category);
    return this.categoryService.createCategory({
      ...category,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    });
  }
  @Patch('update')
  updateCategory(@Body() category: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.updateCategory({
      ...category,
      createdAt: undefined,
      updatedAt: undefined,
    });
  }
  @Delete('delete')
  deleleteCategory(@Body('id') id: string): Promise<Category> {
    return this.categoryService.deleleteCategory(id);
  }
}

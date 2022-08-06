import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryService } from './category.service';

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
  createCategory(@Body() category: Category): Promise<Category> {
    console.log(category);
    return this.categoryService.createCategory(category);
  }
  @Patch('update')
  updateCategory(@Body() category: Category): Promise<Category> {
    return this.categoryService.updateCategory(category);
  }
  @Delete('delete')
  deleleteCategory(@Body('id') id: string): Promise<Category> {
    return this.categoryService.deleleteCategory(id);
  }
}

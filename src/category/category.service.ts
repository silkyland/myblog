import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { async } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private db: PrismaService) {}

  async getCategoryById(id: string) {
    try {
      return await this.db.category.findUnique({ where: { id: id } });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getCategory() {
    try {
      return this.db.category.findMany({});
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async createCategory(category: Category): Promise<Category> {
    try {
      return await this.db.category.create({ data: category });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updateCategory(category: Category): Promise<Category> {
    try {
      return await this.db.category.update({
        where: { id: category.id },
        data: category,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleleteCategory(id: string): Promise<Category> {
    try {
      return await this.db.category.delete({ where: { id: id } });
    } catch (error) {
      throw new Error(error);
    }
  }
}

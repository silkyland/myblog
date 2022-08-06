import { Injectable } from '@nestjs/common';
import { Page } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PageService {
  constructor(private readonly db: PrismaService) {}

  async getPage(id: string): Promise<Page> {
    return await this.db.page.findUnique({ where: { id: id } });
  }
  getPages(): Promise<Page[]> {
    return this.db.page.findMany({});
  }

  async createPage(page: Page): Promise<Page> {
    try {
      return await this.db.page.create({ data: page });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updatePage(page: Page): Promise<Page> {
    try {
      return await this.db.page.update({ where: { id: page.id }, data: page });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deletePage(id: string): Promise<boolean> {
    const page = await this.db.page.delete({ where: { id: id } });
    if (!page) {
      return true;
    }
    return false;
  }
}

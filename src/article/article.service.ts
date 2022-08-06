import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private readonly db: PrismaService) {}
  async getArticleById(id: string): Promise<Article> {
    try {
      return await this.db.article.findFirst({ where: { id: id } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  getArticleList(): Promise<Article[]> {
    try {
      return this.db.article.findMany({});
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async createArticle(article: Article) {
    try {
      console.log(article);
      return await this.db.article.create({ data: article });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updateArticle(article: Article) {
    try {
      return await this.db.article.update({
        where: { id: article.id },
        data: article,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteArticle(id: string) {
    try {
      const article = await this.db.article.delete({ where: { id: id } });
      if (!article) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

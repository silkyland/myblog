import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
    constructor(private readonly db: PrismaService) {}
  
    async getArticle(id: string): Promise<Article> {
      return await this.db.article.findUnique({ where: { id: id } });
    }
    getArticles(): Promise<Article[]> {
      return this.db.article.findMany({});
    }
  
    async createArticle(article: Article): Promise<Article> {
      try {
        return await this.db.article.create({ data: article });
      } catch (error) {
        throw new Error(error.message);
      }
    }
    async updateArticle(article: Article): Promise<Article> {
      try {
        return await this.db.article.update({ where: { id: article.id }, data: article });
      } catch (error) {
        throw new Error(error.message);
      }
    }
    async deleteArticle(id: string): Promise<boolean> {
      const article = await this.db.article.delete({ where: { id: id } });
      if (!article) {
        return true;
      }
      return false;
    }
    }

import { Article } from './../../article/entities/article.entity';

export class Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  articles?: Article[];
}

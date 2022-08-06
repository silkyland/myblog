import { Article } from './../../article/entities/article.entity';
import { Banner } from '../../banner/entities/banner.entity';
import { Page } from '../../page/entities/page.entity';

export class User {
  id: string;
  avatar: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  Article?: Article[];
  Banner?: Banner[];
  Page?: Page[];
}

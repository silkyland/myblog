import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';

export class Post {
  id: string;
  title: string;
  content: string;
  category?: Category;
  author?: User;
  authorId: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
}

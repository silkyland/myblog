import { Post } from '../../post/entities/post.entity';
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
  posts?: Post[];
  Banner?: Banner[];
  Page?: Page[];
}

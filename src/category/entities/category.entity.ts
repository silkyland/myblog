
import {Post} from '../../post/entities/post.entity'


export class Category {
  id: string ;
name: string ;
createdAt: Date ;
updatedAt: Date ;
posts?: Post[] ;
}

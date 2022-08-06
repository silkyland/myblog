
import { Article } from '@prisma/client';


export class Category {
  id: string ;
name: string ;
createdAt: Date ;
updatedAt: Date ;
article?: Article[] ;
}

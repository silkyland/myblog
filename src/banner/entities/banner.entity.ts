
import {User} from '../../user/entities/user.entity'


export class Banner {
  id: string ;
title: string ;
content: string ;
author?: User ;
authorId: string ;
thumbnail: string ;
link: string ;
order: number ;
createdAt: Date ;
updatedAt: Date ;
categoryId: string ;
}

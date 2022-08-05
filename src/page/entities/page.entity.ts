
import {User} from '../../user/entities/user.entity'


export class Page {
  id: string ;
title: string ;
content: string ;
author?: User ;
authorId: string ;
thumbnail: string ;
createdAt: Date ;
updatedAt: Date ;
}

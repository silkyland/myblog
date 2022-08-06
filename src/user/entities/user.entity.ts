
import {Banner} from '../../banner/entities/banner.entity'
import {Page} from '../../page/entities/page.entity'
import { Article } from '@prisma/client';


export class User {
  id: string ;
avatar: string ;
email: string ;
password: string ;
name: string ;
role: string ;
createdAt: Date ;
updatedAt: Date ;
article?: Article[] ;
Banner?: Banner[] ;
Page?: Page[] ;
}

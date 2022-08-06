import { PrismaService } from './../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  controllers: [ArticleController],
  providers: [PrismaService,ArticleService]
})
export class ArticleModule {}

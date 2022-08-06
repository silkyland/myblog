import { PrismaService } from './../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, PrismaService],
})
export class ArticleModule {}

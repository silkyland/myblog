import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('article')
  article(@Param('id') id: string): Promise<Article> {
    return this.articleService.getArticleById(id);
  }
  @Get('articles')
  articles(): Promise<Article[]> {
    return this.articleService.getArticleList();
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './upload/article',
        filename(req, file, callback) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  createArticle(
    @Body() article: CreateArticleDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ): Promise<Article> {
    return this.articleService.createArticle({
      ...article,
      id: undefined,
      thumbnail: thumbnail.filename,
      createdAt: undefined,
      updatedAt: undefined,
    });
  }
  @Patch('update')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './upload/article',
        filename(req, file, callback) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  updateArticle(
    @Body() article: UpdateArticleDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ): Promise<Article> {
    return this.articleService.updateArticle({
      ...article,
      thumbnail: thumbnail.filename,
      createdAt: undefined,
      updatedAt: undefined,
    });
  }
  @Delete('delete')
  deleteArticle(@Param('id') id: string): Promise<boolean> {
    return this.articleService.deleteArticle(id);
  }
}

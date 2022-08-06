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
import { Page } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('page')
  page(@Body('id') id: string):Promise<Page>{
    return this.pageService.getPage(id);
  }
  @Get('pages')
  pages():Promise<Page[]>{
    return this.pageService.getPages();
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './upload/page',
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
  createPage(
    @Body() page: Page,
    @UploadedFile() thumbnail: Express.Multer.File,
  ): Promise<Page> {
    let newPage = thumbnail
      ? { ...page, thumbnail: `page/${thumbnail.filename}` }
      : page;
    return this.pageService.createPage(newPage);
  }
  @Patch('update')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './upload/page',
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
  updatePage(
    @Body() page: Page,
    @UploadedFile() thumbnail: Express.Multer.File,
  ): Promise<Page> {
    let newPage = thumbnail
      ? { ...page, thumbnail: `page/${thumbnail.filename}` }
      : page;
    return this.pageService.updatePage(page);
  }
  @Delete('delete')
  deletePage(@Param() id: string): Promise<boolean> {
    return this.pageService.deletePage(id);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Banner } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BannerService } from './banner.service';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}
  @Get('banner')
  banner(@Body('id') id: string):Promise<Banner>{
    return this.bannerService.getBannerById(id);
  }
  @Get('banners')
  banners():Promise<Banner[]>{
    return this.bannerService.getBanners();
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './upload/banner',
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
  createBanner(
    @Body() banner: Banner,
    @UploadedFile() thumbnail: Express.Multer.File,
  ): Promise<Banner> {
    let newBanner = thumbnail
      ? { ...banner, thumbnail: `banner/${thumbnail.filename}` }
      : banner;
    return this.bannerService.createBanner({ ...newBanner });
  }

  @Patch('update')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './upload/banner',
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
  updateBanner(
    @Body() banner: Banner,
    @UploadedFile() thumbnail: Express.Multer.File,
  ): Promise<Banner> {
    let newBanner = thumbnail
      ? { ...banner, url: `banner/${thumbnail.filename}` }
      : banner;
    return this.bannerService.updateBanner(newBanner);
  }
  @Post('delete') 
  deleteBanner(@Param('id') id: string): Promise<boolean> {
    const banner = this.bannerService.deleteBanner(id);
    return banner;
  }
}

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
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}
  @Get('banner')
  banner(@Body('id') id: string): Promise<Banner> {
    return this.bannerService.getBannerById(id);
  }
  @Get('banners')
  banners(): Promise<Banner[]> {
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
    @Body() banner: CreateBannerDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ): Promise<Banner> {
    return this.bannerService.createBanner({
      ...banner,
      id: undefined,
      thumbnail: `banner/${thumbnail.filename}`,
      createdAt: undefined,
      updatedAt: undefined,
    });
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
    @Body() banner: UpdateBannerDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ): Promise<Banner> {
    return this.bannerService.updateBanner({
      ...banner,
      thumbnail: `banner/${thumbnail.filename}`,
      createdAt: undefined,
      updatedAt: undefined,
    });
  }
  @Post('delete')
  deleteBanner(@Param('id') id: string): Promise<boolean> {
    const banner = this.bannerService.deleteBanner(id);
    return banner;
  }
}

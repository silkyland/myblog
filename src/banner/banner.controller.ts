import {
  Body,
  Controller,
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
  @Post('banner')
  banner(){}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './upload/banner',
    }),
  )
  createBanner(
    @Body() banner: Banner,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Banner> {
    console.log(file);
    let newBanner = file
      ? { ...banner, url: `upload/banner/${file.filename}` }
      : banner;
    return this.bannerService.createBanner({ ...newBanner });
  }

  @Patch('update')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './upload/banner',
    }),
  )
  updateBanner(
    @Body() banner: Banner,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Banner> {
    let newBanner = file
      ? { ...banner, url: `upload/banner/${file.filename}` }
      : banner;
    return this.bannerService.updateBanner(newBanner);
  }
  @Post('delete') 
  deleteBanner(@Param('id') id: string): Promise<boolean> {
    const banner = this.bannerService.deleteBanner(id);
    return banner;
  }
}

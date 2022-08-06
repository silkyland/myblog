import { Injectable } from '@nestjs/common';
import { Banner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BannerService {
  constructor(private readonly db: PrismaService) {}
  createBanner(banner: Banner): Promise<Banner> {
    return;
  }
  updateBanner(newBanner: Banner): Promise<Banner> {
    throw new Error('Method not implemented.');
  }
  async deleteBanner(id: string) {
    try {
      let banner = await this.db.banner.delete({ where: { id: id } });
      if (!banner) {
        return true;
      }return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

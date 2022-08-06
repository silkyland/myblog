import { Injectable } from '@nestjs/common';
import { Banner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BannerService {
  constructor(private readonly db: PrismaService) {}
  getBannerById(id: string): Promise<Banner> {
    try {
      return this.db.banner.findUnique({ where: { id: id } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  getBanners(): Promise<Banner[]> {
    try {
      return this.db.banner.findMany({});
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createBanner(banner: Banner): Promise<Banner> {
    try {
      return await this.db.banner.create({
        data: { ...banner, order: +banner.order },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updateBanner(newBanner: Banner): Promise<Banner> {
    try {
      return await this.db.banner.update({
        where: { id: newBanner.id },
        data: newBanner,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteBanner(id: string) {
    try {
      let banner = await this.db.banner.delete({ where: { id: id } });
      if (!banner) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BannerModule } from './banner/banner.module';
import { PageModule } from './page/page.module';
import { CategoryModule } from './category/category.module';
import { PrismaService } from './prisma/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
    }),
    ArticleModule,
    AuthModule,
    UserModule,
    BannerModule,
    PageModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

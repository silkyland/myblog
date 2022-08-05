import { IsInt, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { IsFile } from 'src/helpers/custom-decorator';

export class CreateBannerDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsOptional()
  @IsFile({ mime: ['image/jpeg', 'image/png', 'image/jpeg'] })
  thumbnail: Express.Multer.File;

  @IsOptional()
  @IsUrl()
  link?: string;

  @IsInt()
  order: number;
  categoryId: string;
}

import { IsOptional, IsString, MinLength } from 'class-validator';
import { IsFile } from 'src/helpers/custom-decorator';

export class CreateBannerDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsOptional()
  @IsFile({ mime: ['image/jpeg', 'image/png', 'image/jpg'] })
  thumbnail: string;
  link: string;
  order: number;
  categoryId: string;
}

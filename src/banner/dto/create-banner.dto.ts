import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { IsFile } from 'src/helpers/custom-decorator';

export class CreateBannerDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  content: string;

  @IsOptional()
  @IsFile({ mime: ['image/jpeg', 'image/png', 'image/jpg'] })
  thumbnail: string;
  
  @IsString()
  @MinLength(3)
  link: string;

  @IsInt()
  order: number;

  @IsString()
  @MinLength(5)
  categoryId: string;

  @IsString()
  @MinLength(5)
  authorId: string;
}

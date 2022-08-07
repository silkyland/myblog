import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { IsFile } from 'src/helpers/custom-decorator';

export class UpdateArticleDto {
  @IsNotEmpty()
  id: string;
  
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  content: string;

  @IsOptional()
  @IsFile({ mime: ['image/jpeg', 'image/png', 'image/jpg'] })
  thumbnail: string;

  @IsNotEmpty()
  authorId: string;

  @IsNotEmpty()
  categoryId: string;
}

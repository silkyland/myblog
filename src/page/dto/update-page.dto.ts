import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { IsFile } from 'src/helpers/custom-decorator';

export class UpdatePageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(5)
  content: string;

  @IsOptional()
  @IsFile({ mime: ['image/jpeg', 'image/png', 'image/jpg'] })
  thumbnail: string;

  @IsString()
  @MinLength(5)
  authorId: string;
}

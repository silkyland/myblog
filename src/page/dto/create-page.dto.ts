import { IsInt, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { IsFile } from 'src/helpers/custom-decorator';

export class CreatePageDto {
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @MinLength(10)
  content: string;

  @IsOptional()
  @IsFile({ mime: ['image/jpg', 'image/png', 'image/jpeg'] })
  thumbnail: Express.Multer.File;
}

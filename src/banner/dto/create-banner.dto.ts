import { IsString, MinLength } from "class-validator";

export class CreateBannerDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsOptional()
  @IsFile()
  thumbnail: string;
  link: string;
  order: number;
  categoryId: string;
}

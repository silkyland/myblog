import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @MinLength(5)
  name: string;
}

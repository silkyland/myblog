import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { IsFile } from 'src/helpers/custom-decorator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsFile({ mime: ['image/jpeg', 'image/png', 'image/jpg'] })
  avatar: string;
}

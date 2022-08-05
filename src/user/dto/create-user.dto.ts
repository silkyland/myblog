import { IsEmail, IsNotEmpty, IsOptional, Min, minLength, MinLength } from 'class-validator';
import { IsFile, Match } from 'src/helpers/custom-decorator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsFile({ mime: ['image/jpeg', 'image/png'] }, { message: 'รูปไม่ถูกต้อง' })
  avatar?: Express.Multer.File;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @MinLength(6)
  @IsNotEmpty()
  @Match('password')
  confirmPassword: string;

  @IsNotEmpty()
  name: string;
}

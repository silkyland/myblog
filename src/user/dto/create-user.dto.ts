import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  avatar?: Express.Multer.File;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  name: string;
}

import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { kDefaultAvatarUrl } from './../helpers/constant';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // @UseGuards(LocalAuthGuard)
  public async login(@Body() user: LoginUserDto): Promise<string> {
    return this.authService.login(user);
  }

  @Post('register')
  // @UseGuards(LocalAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', { dest: './uploads/avatar' }))
  public async register(
    @Body() input: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<string> {
    const inputUser = {
      ...input,
      avatar: avatar ? `avatar/${avatar.filename}` : kDefaultAvatarUrl,
      id: '',
      role: 'user',
      confirmPassword: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    };
    return this.authService.register(inputUser);
  }

  private async validate(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    return this.authService.validate(email, password);
  }
}

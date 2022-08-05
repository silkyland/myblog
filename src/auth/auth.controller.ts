import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { kDefaultAvatarUrl } from './../helpers/constant';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() user: User): Promise<string> {
    return this.authService.login(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('register')
  @UseInterceptors(FileInterceptor('avatar', { dest: './uploads/avatar' }))
  public async register(
    @Body() input: User,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<string> {
    return this.authService.register({
      ...input,
      avatar: avatar ? avatar.filename : kDefaultAvatarUrl,
    });
  }

  private async validate(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    return this.authService.validate(email, password);
  }
}

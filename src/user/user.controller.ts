import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  user(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }
  @Get('users')
  users(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './upload/avatar',
        filename(req, file, callback) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  createUser(
    @Body() user: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<User> {
    const securePassword = bcrypt.hashSync(user.password, 10);
    return this.userService.createUser({
      ...user,
      id: undefined,
      role: undefined,
      avatar: `avatar/${avatar.filename}`,
      password: securePassword,
      createdAt: undefined,
      updatedAt: undefined,
    });
  }
  @Post('update')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './upload/avatar',
        filename(req, file, callback) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  updateUser(
    @Body() user: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<User> {
    const securePassword = bcrypt.hashSync(user.password, 10);
    let newUser = avatar
      ? { ...user, avatar: `avatar/${avatar.filename}` }
      : user;
    return this.userService.updateUser({
      ...user,
      role: undefined,
      avatar: `avatar/${avatar.filename}`,
      password: securePassword,
      createdAt: undefined,
      updatedAt: undefined,
    });
  }
  @Post('delete')
  deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}

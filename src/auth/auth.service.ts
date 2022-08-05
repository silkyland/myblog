import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User | undefined> {
    const user = await this.db.user.findUnique({
      where: { email: email },
    });

    if (user && compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<string> {
    try {
      const foundUser = await this.db.user.findUnique({
        where: { email: user.email },
      });

      if (!foundUser) {
        throw new HttpException(
          `อีเมล์หรือรหัสผ่านไม่ถูกต้อง`,
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (!compareSync(user.password, foundUser.password)) {
        throw new HttpException(
          `อีเมล์หรือรหัสผ่านไม่ถูกต้อง`,
          HttpStatus.UNAUTHORIZED,
        );
      }
      const payload = { email: user.email, sub: user.id };
      return this.jwtService.sign(payload);
    } catch (error) {
      throw error;
    }
  }

  async register(user: User): Promise<string> {
    try {
      const newUser = await this.db.user.create({
        data: {
          ...user,
          password: hashSync(user.password, 10),
        },
      });

      return await this.jwtService.sign({
        email: newUser.email,
        sub: newUser.id,
      });
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException(
            `อีเมล์ ${user.email} ถูกใช้ไปแล้ว`,
            HttpStatus.FORBIDDEN,
          );
        }
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

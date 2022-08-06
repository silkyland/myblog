import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  async getUserById(id: string): Promise<User> {
    try {
      return await this.db.user.findFirst({ where: { id: id } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getUsers(): Promise<User[]> {
    try {
      return await this.db.user.findMany({});
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      return await this.db.user.create({ data: user });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updateUser(user: User): Promise<User> {
    try {
      return await this.db.user.update({ where: { id: user.id }, data: user });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteUser(id: string): Promise<boolean> {
    try {
      let user = await this.db.user.delete({ where: { id: id } });
      if (!user) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

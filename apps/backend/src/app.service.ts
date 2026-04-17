import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, User } from '../generated/prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }


  getHello(): string {
    return 'Hello World!';
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}

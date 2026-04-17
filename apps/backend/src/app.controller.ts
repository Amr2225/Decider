import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma, User } from 'generated/prisma/client';

// Auth -- Method 2
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("create-user")
  createUser(): Promise<User> {
    const data: Prisma.UserCreateInput = {
      name: "John Doe",
      email: "john.doe@example.com",
    }


    return this.appService.createUser(data);
  }

  @Get("get-users")
  getUsers(): Promise<User[]> {
    return this.appService.getUsers();
  }
}

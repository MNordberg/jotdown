import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getNotes(): Promise<User[]> {
    return this.usersService.findAll();
  }
}

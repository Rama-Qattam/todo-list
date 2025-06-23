import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/todos')
  async getUserWithTodos(@Param('id') id: string) {
    return this.userService.findByIdWithTodos(id);
  }

  @Get()
  async getAllUsersWithTodos() {
    return this.userService.findAllWithTodos();
  }
}

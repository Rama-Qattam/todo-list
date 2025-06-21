import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Controller('todos')
@UsePipes(new ValidationPipe({ transform: true }))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const todo = await this.todoService.create(createTodoDto);
    return {
      message: 'Todo created successfully',
      data: todo,
    };
  }

  @Get()
  async findAll(@Query('userId') userId: string) {
    try {
      const todos = await this.todoService.findAllByUser(userId);
      return {
        message: 'Todos retrieved successfully',
        data: todos,
      };
    } catch (error) {
      return {
        message: 'No data recorded',
        data: [],
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const todo = await this.todoService.findOne(id);
    return {
      message: 'Todo retrieved successfully',
      data: todo,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoService.update(id, updateTodoDto);
    return {
      message: 'Todo updated successfully',
      data: todo,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.todoService.remove(id);
    return result;
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const todo = await this.todoService.updateStatus(id, status);
    return {
      message: 'Todo status updated successfully',
      data: todo,
    };
  }
}

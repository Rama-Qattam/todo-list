import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from '../schemas/todo.schema';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    return createdTodo.save();
  }

  async findAllByUser(userId: string): Promise<Todo[]> {
    const todos = await this.todoModel
      .find({ userId, isDeleted: false })
      .sort({ createdAt: -1 })
      .exec();

    if (todos.length === 0) {
      throw new NotFoundException('No data recorded');
    }

    return todos;
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoModel
      .findOne({ _id: id, isDeleted: false })
      .exec();

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updatedTodo = await this.todoModel
      .findOneAndUpdate({ _id: id, isDeleted: false }, updateTodoDto, {
        new: true,
      })
      .exec();

    if (!updatedTodo) {
      throw new NotFoundException('Todo not found');
    }

    return updatedTodo;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.todoModel
      .findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
      )
      .exec();

    if (!result) {
      throw new NotFoundException('Todo not found');
    }

    return { message: 'Todo deleted successfully' };
  }

  async updateStatus(id: string, status: string): Promise<Todo> {
    const updatedTodo = await this.todoModel
      .findOneAndUpdate(
        { _id: id, isDeleted: false },
        { status },
        { new: true },
      )
      .exec();

    if (!updatedTodo) {
      throw new NotFoundException('Todo not found');
    }

    return updatedTodo;
  }
}

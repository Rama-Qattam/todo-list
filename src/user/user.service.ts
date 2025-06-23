import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByIdWithTodos(userId: string) {
    const user = await this.userModel.findById(userId).populate('todos').exec();

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findAllWithTodos() {
    const users = await this.userModel.find().populate('todos').exec();
    return users;
  }
}

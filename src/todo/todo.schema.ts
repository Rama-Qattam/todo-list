import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TodoDocument = Todo & Document;

export enum TodoStatus {
  IN_PROGRESS = 'in progress',
  COMPLETE = 'complete',
  PENDING = 'pending',
  DELETED = 'deleted',
}

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true, minlength: 4, maxlength: 20 })
  name: string;

  @Prop({ maxlength: 500, default: '' })
  description: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({
    type: String,
    enum: TodoStatus,
    default: TodoStatus.IN_PROGRESS,
  })
  status: TodoStatus;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

TodoSchema.pre('save', function () {
  if (!this.id) {
    this.id = this.name.toLowerCase().replace(/\s+/g, '-');
  }
});

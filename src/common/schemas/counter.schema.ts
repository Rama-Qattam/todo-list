import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CounterDocument = Counter & Document;

@Schema()
export class Counter {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  seq: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);

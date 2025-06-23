import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'Name must be at least 4 characters long' })
  @MaxLength(20, { message: 'Name must not exceed 20 characters' })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description?: string;

  @IsDateString()
  @Transform(({ value }) => {
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      throw new Error('Due date cannot be in the past');
    }
    return value as string;
  })
  dueDate: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

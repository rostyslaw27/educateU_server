import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Lesson } from 'src/lesson/lesson.schema';
import { Response } from 'src/response/response.schema';
import { User } from 'src/user/user.schema';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @ApiProperty({
    example: 'NestJS Course',
    description: 'Course title',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: 'In this course you will learn NestJS',
    description: 'Course description',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: '100',
    description: 'This course cost 100',
  })
  @Prop({ required: true })
  price: number;

  @ApiProperty({
    example: '4.5',
    description: 'Course rating',
  })
  @Prop({ required: true, default: 0 })
  rating: number;

  @ApiProperty({
    example: 'User Id',
    description: 'The user who created this course',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @ApiProperty({
    example: 'Course lessons',
    description: 'Course lessons',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' })
  lessons: Lesson[];

  @ApiProperty({
    example: 'Course responses',
    description: 'Course responses',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Response' })
  responses: Response[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Course } from 'src/course/course.schema';
import { User } from 'src/user/user.schema';

export type ResponseDocument = Response & Document;

@Schema()
export class Response {
  @ApiProperty({
    example: 'Great course',
    description: 'Response to the course',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: '4.5',
    description: 'Course rating',
  })
  @Prop({ required: true })
  rating: number;

  @ApiProperty({
    example: '27.07.2022',
    description: 'Response creation date',
  })
  @Prop({ default: Date.now, required: true })
  date: Date;

  @ApiProperty({
    example: 'User Id',
    description: 'The user who created this response',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @ApiProperty({
    example: 'Course Id',
    description: 'The course to which the response is left',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
  courseId: Course;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);

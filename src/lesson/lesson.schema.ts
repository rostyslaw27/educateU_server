import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Course } from 'src/course/course.schema';
import { Question } from 'src/question/question.schema';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  @ApiProperty({
    example: 'NestJS Modules',
    description: 'Lesson title',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: 'In this video you will learn NestJS modules',
    description: 'Lesson description',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: 'Video',
    description: 'Video',
  })
  @Prop({ required: true })
  video: string;

  @ApiProperty({
    example: 'Course Id',
    description: 'Course Id',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  courseId: Course;

  @ApiProperty({
    example: 'Questions',
    description: 'Questions list',
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] })
  questions: Question[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

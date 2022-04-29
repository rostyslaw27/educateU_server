import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
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
    example: 'Questions',
    description: 'Questions list',
  })
  @Prop()
  questions: Question[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  @ApiProperty({
    example: 'NestJS Modules',
    description: 'Learn all about NestJS Modules',
  })
  @Prop()
  title: string;

  @ApiProperty({
    example: 'In this video you will learn NestJS modules',
    description: 'In this video you will learn NestJS modules',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: 'Video',
    description: 'Video',
  })
  @Prop({ required: true })
  video: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Answer } from 'src/answer/answer.schema';
import { User } from 'src/user/user.schema';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @ApiProperty({
    example: 'NestJS modules error',
    description: 'Question title',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: 'What is the reason to use modules in NestJS?',
    description: 'Question description',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: '27.07.2022',
    description: 'Question creation date',
  })
  @Prop({ default: Date.now, required: true })
  date: Date;

  @ApiProperty({
    example: 'User Id',
    description: 'The user who wrote this question',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @ApiProperty({
    example: 'Answers',
    description: 'Answers list',
  })
  @Prop()
  answers: Answer[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

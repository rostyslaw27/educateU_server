import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Question } from 'src/question/question.schema';
import { User } from 'src/user/user.schema';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @ApiProperty({
    example: 'It is better to use context than redux',
    description: 'Answer description',
  })
  @Prop({ required: true })
  text: string;

  @ApiProperty({
    example: '27.07.2022',
    description: 'Answer creation date',
  })
  @Prop({ default: Date.now, required: true })
  date: Date;

  @ApiProperty({
    example: 'User Id',
    description: 'The user who wrote this answer',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @ApiProperty({
    example: 'Question Id',
    description: 'Question Id',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  })
  questionId: Question;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

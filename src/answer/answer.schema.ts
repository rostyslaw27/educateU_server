import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/user/user.schema';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @ApiProperty({
    example: 'It is better to use context than redux',
    description: 'Answer description',
  })
  @Prop({ required: true })
  description: string;

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
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

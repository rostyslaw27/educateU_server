import mongoose from 'mongoose';

export class CreateAnswerDto {
  readonly text: string;
  readonly questionId: mongoose.Schema.Types.ObjectId;
  readonly createdBy: mongoose.Schema.Types.ObjectId;
}

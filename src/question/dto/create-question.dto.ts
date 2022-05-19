import mongoose from 'mongoose';

export class CreateQuestionDto {
  readonly text: string;
  readonly lessonId: mongoose.Schema.Types.ObjectId;
  readonly createdBy: mongoose.Schema.Types.ObjectId;
}

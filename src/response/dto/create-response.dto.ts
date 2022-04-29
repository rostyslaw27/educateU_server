import mongoose from 'mongoose';

export class CreateResponseDto {
  readonly rating: number;
  readonly description: string;
  readonly createdBy: mongoose.Schema.Types.ObjectId;
  readonly courseId: mongoose.Schema.Types.ObjectId;
}

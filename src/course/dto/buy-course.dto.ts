import mongoose from 'mongoose';

export class BuyCourseDto {
  readonly courseId: mongoose.Schema.Types.ObjectId;
  readonly userId: mongoose.Schema.Types.ObjectId;
}

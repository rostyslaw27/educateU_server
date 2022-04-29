import mongoose from 'mongoose';

export class CreateCourseDto {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly createdBy: mongoose.Schema.Types.ObjectId;
}

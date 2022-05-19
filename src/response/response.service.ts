import { CreateResponseDto } from './dto/create-response.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Response, ResponseDocument } from './response.schema';
import { Course, CourseDocument } from 'src/course/course.schema';

@Injectable()
export class ResponseService {
  constructor(
    @InjectModel(Response.name) private responseModel: Model<ResponseDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(dto: CreateResponseDto): Promise<Response> {
    const response = await this.responseModel.create({ ...dto });
    const course = await this.courseModel
      .findById(dto.courseId)
      .populate('responses');

    course.responses.push(response);
    const ratingsSum = course.responses.reduce(
      (acc, course) => acc + course.rating,
      0,
    );
    course.rating = ratingsSum / course.responses.length;

    await course.save();
    return response;
  }

  async getByCourseId(id: ObjectId): Promise<Response[]> {
    const responses = await this.responseModel
      .find({ courseId: id })
      .populate('createdBy', 'email')
      .sort({ date: -1 });
    return responses;
  }
}

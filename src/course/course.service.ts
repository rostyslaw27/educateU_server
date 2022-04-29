import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Course, CourseDocument } from './course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { Response, ResponseDocument } from 'src/response/response.schema';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Response.name) private responseModel: Model<ResponseDocument>,
  ) {}

  async create(dto: CreateCourseDto): Promise<Course> {
    const course = await this.courseModel.create({ ...dto });
    return course;
  }

  async getAll(): Promise<Course[]> {
    const courses = await this.courseModel.find();
    return courses;
  }

  async getOne(id: ObjectId): Promise<Course> {
    const course = await this.courseModel.findById(id);
    return course;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const course = await this.courseModel.findByIdAndDelete(id);
    return course._id;
  }

  async addResponse(dto: CreateResponseDto): Promise<ResponseDocument> {
    const course = await this.courseModel
      .findById(dto.courseId)
      .populate('responses');

    const response = await this.responseModel.create({ ...dto });
    course.responses.push(response._id);
    const ratingsSum = course.responses.reduce(
      (acc, course) => acc + course.rating,
      0,
    );
    course.rating = ratingsSum / course.responses.length;
    await course.save();
    return response;
  }

  async search(query: string): Promise<Course[]> {
    const courses = await this.courseModel.find({
      title: { $regex: new RegExp(query, 'i') },
    });
    return courses;
  }
}

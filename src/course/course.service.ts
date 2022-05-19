import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Course, CourseDocument } from './course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { Response, ResponseDocument } from 'src/response/response.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileService, FileType } from 'src/file/file.service';
import { User, UserDocument } from 'src/user/user.schema';
import { BuyCourseDto } from './dto/buy-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Response.name) private responseModel: Model<ResponseDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateCourseDto, picture): Promise<Course> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const user = await this.userModel.findById(dto.createdBy);
    const course = await this.courseModel.create({
      ...dto,
      picture: picturePath,
    });

    user.createdCourses.push(course);

    await user.save();

    return course;
  }

  async buy(dto: BuyCourseDto): Promise<Course> {
    const course = await this.courseModel.findById(dto.courseId);
    const user = await this.userModel.findById(dto.userId);

    course.purchasers.push(user._id);
    user.purchasedCourses.push(course);

    await user.save();
    await course.save();

    return course;
  }

  async getPurchasedUserCourses(id: ObjectId): Promise<Course[]> {
    const user = await this.userModel.findById(id).populate('purchasedCourses');

    return user.purchasedCourses;
  }

  async getCreatedUserCourses(id: ObjectId): Promise<Course[]> {
    const user = await this.userModel.findById(id).populate('createdCourses');

    return user.createdCourses;
  }

  async update(dto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseModel.findByIdAndUpdate(
      dto._id,
      { ...dto },
      { new: true },
    );
    return course;
  }

  async getAll(): Promise<Course[]> {
    const courses = await this.courseModel.find();
    return courses;
  }

  async getOne(id: ObjectId): Promise<Course> {
    const course = await this.courseModel
      .findById(id)
      .populate('createdBy', '_id email')
      .populate('lessons')
      .populate('responses');

    return course;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const course = await this.courseModel.findByIdAndDelete(id);
    return course._id;
  }

  async search(query: string): Promise<Course[]> {
    const courses = await this.courseModel.find({
      title: { $regex: new RegExp(query, 'i') },
    });
    return courses;
  }
}

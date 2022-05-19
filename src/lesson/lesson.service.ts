import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LessonDocument } from './lesson.schema';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Course, CourseDocument } from 'src/course/course.schema';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateLessonDto, video): Promise<Lesson> {
    const videoPath = this.fileService.createFile(FileType.VIDEO, video);
    const lesson = await this.lessonModel.create({
      ...dto,
      video: videoPath,
    });

    const course = await this.courseModel.findById(dto.courseId);
    course.lessons.push(lesson);
    await course.save();

    return lesson;
  }

  async update(dto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonModel.findByIdAndUpdate(
      dto._id,
      { ...dto },
      { new: true },
    );
    return lesson;
  }

  async getOne(id: ObjectId): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(id).populate('questions');
    return lesson;
  }

  async delete(id: ObjectId): Promise<Lesson> {
    const lesson = await this.lessonModel.findByIdAndDelete(id);
    this.fileService.removeFile(lesson.video);

    return lesson._id;
  }
}

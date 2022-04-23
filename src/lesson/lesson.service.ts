import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LessonDocument } from './lesson.schema';
import { Model } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateLessonDto, video): Promise<Lesson> {
    const videoPath = this.fileService.createFile(FileType.VIDEO, video);
    const lesson = await this.lessonModel.create({
      ...dto,
      video: videoPath,
    });
    return lesson;
  }
}

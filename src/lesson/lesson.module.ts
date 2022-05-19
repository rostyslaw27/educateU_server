import { CourseSchema } from './../course/course.schema'
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course } from 'src/course/course.schema';
import { FileModule } from 'src/file/file.module';
import { LessonController } from './lesson.controller';
import { Lesson, LessonSchema } from './lesson.schema';
import { LessonService } from './lesson.service';

@Module({
  controllers: [LessonController],
  providers: [LessonService],
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    FileModule,
  ],
})
export class LessonModule {}

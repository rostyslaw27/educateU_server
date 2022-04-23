import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from 'src/file/file.module';
import { LessonController } from './lesson.controller';
import { Lesson, LessonSchema } from './lesson.schema';
import { LessonService } from './lesson.service';

@Module({
  controllers: [LessonController],
  providers: [LessonService],
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
    FileModule,
  ],
})
export class LessonModule {}

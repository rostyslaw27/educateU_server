import { ObjectId } from 'mongoose';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonService } from './lesson.service';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lessons')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post('/create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'video', maxCount: 1 }]))
  create(@UploadedFiles() files, @Body() dto: CreateLessonDto) {
    const { video } = files;
    return this.lessonService.create(dto, video[0]);
  }

  @Put('/:id')
  update(@Body() dto: UpdateLessonDto) {
    return this.lessonService.update(dto);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.lessonService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.lessonService.delete(id);
  }
}

import { ObjectId } from 'mongoose';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Get()
  getAll() {
    return this.courseService.getAll();
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.courseService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.courseService.getOne(id);
  }
}

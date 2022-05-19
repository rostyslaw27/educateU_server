import { ObjectId } from 'mongoose';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { BuyCourseDto } from './dto/buy-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('/create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(@UploadedFiles() files, @Body() dto: CreateCourseDto) {
    const { picture } = files;
    return this.courseService.create(dto, picture[0]);
  }

  @Put('/:id')
  update(@Body() dto: UpdateCourseDto) {
    return this.courseService.update(dto);
  }

  @Post('/buy')
  buyCourse(@Body() dto: BuyCourseDto) {
    return this.courseService.buy(dto);
  }

  @Get()
  getAll() {
    return this.courseService.getAll();
  }

  @Get('/purchased/:id')
  getPurchasedUserCourses(@Param('id') id: ObjectId) {
    return this.courseService.getPurchasedUserCourses(id);
  }

  @Get('/created/:id')
  getCreatedUserCourses(@Param('id') id: ObjectId) {
    return this.courseService.getCreatedUserCourses(id);
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

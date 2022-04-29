import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from './course.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Response, ResponseSchema } from 'src/response/response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([
      { name: Response.name, schema: ResponseSchema },
    ]),
  ],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}

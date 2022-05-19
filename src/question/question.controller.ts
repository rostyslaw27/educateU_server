import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post('create')
  create(@Body() dto: CreateQuestionDto) {
    return this.questionService.create(dto);
  }

  @Get(':id')
  getByLessonId(@Param('id') id: ObjectId) {
    return this.questionService.getByLessonId(id);
  }
}

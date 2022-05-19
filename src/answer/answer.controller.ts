import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { ObjectId } from 'mongoose';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('answers')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Post('/create')
  create(@Body() dto: CreateAnswerDto) {
    return this.answerService.create(dto);
  }

  @Get(':id')
  getByQuestionId(@Param('id') id: ObjectId) {
    return this.answerService.getByQuestionId(id);
  }
}

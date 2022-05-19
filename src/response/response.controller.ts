import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateResponseDto } from './dto/create-response.dto';
import { ResponseService } from './response.service';

@Controller('responses')
export class ResponseController {
  constructor(private responseService: ResponseService) {}

  @Post('create')
  create(@Body() dto: CreateResponseDto) {
    return this.responseService.create(dto);
  }

  @Get(':id')
  getByCourseId(@Param('id') id: ObjectId) {
    return this.responseService.getByCourseId(id);
  }
}

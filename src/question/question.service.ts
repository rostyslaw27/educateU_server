import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from './question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Lesson, LessonDocument } from 'src/lesson/lesson.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
  ) {}

  async create(dto: CreateQuestionDto): Promise<Question> {
    const question = await this.questionModel.create({ ...dto });
    const lesson = await this.lessonModel.findById(dto.lessonId);
    lesson.questions.push(question);
    await lesson.save();
    return question;
  }

  async getByLessonId(id: ObjectId): Promise<Question[]> {
    const questions = await this.questionModel
      .find({ lessonId: id })
      .sort({ date: -1 })
      .populate('answers')
      .populate('createdBy', 'email _id');
    return questions;
  }
}

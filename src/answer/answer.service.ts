import { Injectable } from '@nestjs/common';
import { Answer, AnswerDocument } from './answer.schema';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Question, QuestionDocument } from 'src/question/question.schema';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async create(dto: CreateAnswerDto): Promise<Answer> {
    const answer = await this.answerModel.create({ ...dto });

    const question = await this.questionModel.findById(dto.questionId);
    question.answers.push(answer);
    await question.save();

    return answer;
  }

  async getByQuestionId(id: ObjectId): Promise<Answer[]> {
    const answers = await this.answerModel
      .find({ questionId: id })
      .sort({ date: -1 })
      .populate('createdBy', 'email');

    return answers;
  }
}

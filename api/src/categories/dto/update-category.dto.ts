import { Question } from '../entities/question.entity';

export class UpdateCategoryDto {
  name: string;
  questions: Question[];
}

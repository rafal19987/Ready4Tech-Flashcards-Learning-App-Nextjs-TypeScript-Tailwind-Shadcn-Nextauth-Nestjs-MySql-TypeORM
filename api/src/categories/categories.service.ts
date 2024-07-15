import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { EntityManager, Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
    @InjectRepository(Question)
    private readonly questionsRepo: Repository<Question>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesRepo.find({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (category.length > 0)
      throw new HttpException('Category already exists', HttpStatus.CONFLICT);

    const questions = [];

    return await this.categoriesRepo.save({
      ...createCategoryDto,
      questions,
    });
  }

  async findAll() {
    const categories = await this.categoriesRepo.find({
      relations: { questions: true },
    });

    if (categories.length < 1) return [];

    return categories;
  }

  async findOne(categoryName: string) {
    const category = await this.categoriesRepo.find({
      where: {
        name: categoryName,
      },
      relations: {
        questions: true,
      },
    });

    if (category.length < 1)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return category;
  }

  async removeOne(id: number) {
    const category = await this.categoriesRepo.find({
      where: {
        id,
      },
    });

    if (category.length < 1)
      throw new HttpException('Category not exist', HttpStatus.NOT_FOUND);

    await this.categoriesRepo.remove(category);
  }

  async update(categoryName: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepo.findOne({
      where: {
        name: categoryName,
      },
    });

    if (!category)
      throw new HttpException('Category not exist', HttpStatus.NOT_FOUND);

    const categoryWithUpdatedName = await this.categoriesRepo.findOne({
      where: {
        name: updateCategoryDto.name,
      },
    });

    if (categoryWithUpdatedName)
      throw new HttpException(
        `Category ${updateCategoryDto.name} already exists`,
        HttpStatus.CONFLICT,
      );

    category.name = updateCategoryDto.name;

    return this.entityManager.save(category);
  }

  async findAllCategoryQuestions(categoryName: string) {
    const category = await this.categoriesRepo.findOne({
      where: {
        name: categoryName,
      },
      relations: {
        questions: true,
      },
    });

    if (!category) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    const questions = category.questions.map((question) => question);
    return questions;
  }

  async createQuestion(
    categoryName: string,
    createQuestionDto: CreateQuestionDto,
  ) {
    const category = await this.categoriesRepo.findOne({
      where: {
        name: categoryName,
      },
      relations: {
        questions: true,
      },
    });

    if (!category) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    const questionTitle = createQuestionDto.title;

    const questionExist = await this.categoriesRepo
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.questions', 'questions')
      .where('questions.title = :questionTitle', { questionTitle })
      .andWhere('category.name = :categoryName', { categoryName })
      .getOne();

    if (questionExist)
      throw new HttpException('Question already exist', HttpStatus.CONFLICT);

    const questions = category.questions.map(
      (question) => new Question(question),
    );

    const question = new Question(createQuestionDto);
    questions.push(question);

    category.questions = [...questions];

    return await this.categoriesRepo.save(category);
  }

  async deleteQuestion(categoryName: string, questionId: number) {
    const category = await this.categoriesRepo.findOne({
      where: {
        name: categoryName,
      },
      relations: {
        questions: true,
      },
    });

    if (!category)
      throw new HttpException('Not found category', HttpStatus.NOT_FOUND);

    const question = category.questions.filter(
      (question) => question.id === questionId,
    );

    if (!question)
      throw new HttpException(
        'Not found question in category',
        HttpStatus.NOT_FOUND,
      );

    // Remove the question from the category's questions array
    category.questions = category.questions.filter((q) => q.id !== questionId);

    // Save the updated category without the removed question
    return await this.categoriesRepo.save(category);
  }

  async updateQuestion(
    categoryName: string,
    questionId: number,
    updateQuestionDto: UpdateQuestionDto,
  ) {
    const category = await this.categoriesRepo.findOne({
      where: {
        name: categoryName,
      },
      relations: {
        questions: true,
      },
    });

    if (!category)
      throw new HttpException('Not found category', HttpStatus.NOT_FOUND);

    const question = category.questions.find(
      (question) => question.id === questionId,
    );

    if (!question)
      throw new HttpException(
        'Not found question in category',
        HttpStatus.NOT_FOUND,
      );

    const questionTitle = updateQuestionDto.title;

    const questionWithUpdatedTitleExist = await this.categoriesRepo
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.questions', 'questions')
      .where('questions.title = :questionTitle', { questionTitle })
      .andWhere('category.name = :categoryName', { categoryName })
      .getOne();

    if (questionWithUpdatedTitleExist)
      throw new HttpException('Question already exist', HttpStatus.CONFLICT);

    if (updateQuestionDto.title) {
      question.title = updateQuestionDto.title;
    }
    if (updateQuestionDto.answer) {
      question.answer = updateQuestionDto.answer;
    }

    await this.questionsRepo.save(question);

    return question;
  }
}

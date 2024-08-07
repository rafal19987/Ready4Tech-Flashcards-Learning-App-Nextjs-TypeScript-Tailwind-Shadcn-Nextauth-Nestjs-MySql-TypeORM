import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':categoryName')
  async findOne(@Param('categoryName') categoryName: string) {
    return this.categoriesService.findOne(categoryName);
  }

  @Delete(':id')
  async removeOne(@Param('id') id: string) {
    return this.categoriesService.removeOne(+id);
  }

  @Patch(':categoryName')
  async update(
    @Param('categoryName') categoryName: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(categoryName, updateCategoryDto);
  }

  @Get(':categoryName/questions')
  async findAllCategoryQuestions(@Param('categoryName') categoryName: string) {
    return this.categoriesService.findAllCategoryQuestions(categoryName);
  }

  @Post(':categoryName/questions')
  async createQuestion(
    @Param('categoryName') categoryName: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.categoriesService.createQuestion(
      categoryName,
      createQuestionDto,
    );
  }

  @Delete(':categoryName/questions/:questionId')
  async deleteQuestion(
    @Param('categoryName') categoryName: string,
    @Param('questionId') questionId: string,
  ) {
    return this.categoriesService.deleteQuestion(categoryName, +questionId);
  }

  @Patch(':categoryName/questions/:questionId')
  async updateQuestion(
    @Param('categoryName') categoryName: string,
    @Param('questionId') questionId: string,
    @Body() updateQuestion: UpdateQuestionDto,
  ) {
    return this.categoriesService.updateQuestion(
      categoryName,
      +questionId,
      updateQuestion,
    );
  }
}

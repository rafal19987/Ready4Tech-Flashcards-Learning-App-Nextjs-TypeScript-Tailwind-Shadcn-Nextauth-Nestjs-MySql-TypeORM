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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
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
}

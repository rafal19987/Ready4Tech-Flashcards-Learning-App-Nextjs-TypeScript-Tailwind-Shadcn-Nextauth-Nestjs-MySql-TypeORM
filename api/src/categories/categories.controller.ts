import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  UseInterceptors,
  HttpException,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { UpdateCategoryDto } from './dto/update-category.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

  @Post(':categoryName/import-questions')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      // limits: { files: 1, fileSize: 1024 * 1024 * 5 },
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(csv)$/)) {
          return callback(
            new HttpException(
              'Only CSV files are allowed!',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async importQuestions(
    @Param('categoryName') categoryName: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }
    try {
      const filePath = file.path;
      return await this.categoriesService.importQuestionsFromCsv(
        categoryName,
        filePath,
      );
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

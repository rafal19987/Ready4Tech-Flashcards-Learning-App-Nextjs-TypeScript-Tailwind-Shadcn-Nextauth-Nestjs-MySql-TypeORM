import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Question } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Question])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}

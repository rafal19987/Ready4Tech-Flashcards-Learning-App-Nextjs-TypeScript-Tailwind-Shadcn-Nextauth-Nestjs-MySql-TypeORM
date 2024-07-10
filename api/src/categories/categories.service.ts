import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { EntityManager, Repository } from 'typeorm';
// import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
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

    return await this.categoriesRepo.save(createCategoryDto);
  }

  async findAll() {
    const categories = await this.categoriesRepo.find();

    if (categories.length < 1)
      throw new HttpException(
        'No categories created yet ww yyyyes',
        HttpStatus.NOT_FOUND,
      );

    return categories;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}

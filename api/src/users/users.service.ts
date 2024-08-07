import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepo.findOneBy({
      email: createUserDto.email,
    });

    console.log(user);

    if (user) throw new HttpException('User exits', HttpStatus.CONFLICT);

    const hashedPassword = await hash(createUserDto.password, 10);

    const newUser = await this.usersRepo.save({
      ...createUserDto,
      password: hashedPassword,
    });

    const { password, ...result } = newUser;
    return result;
  }

  async findUserWithPasswordByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();

    console.log('User found');

    if (!user) throw new HttpException('User not exist', HttpStatus.NOT_FOUND);

    return user;
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.usersRepo.findOneBy({ id });
  }
}

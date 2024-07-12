import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Question extends AbstractEntity<Question> {
  @Column()
  title: string;

  @Column()
  answer: string;

  @ManyToOne(() => Category, (category) => category.questions, {
    onDelete: 'CASCADE',
  })
  category: Category;
}

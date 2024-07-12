import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Question } from './question.entity';

@Entity()
export class Category extends AbstractEntity<Category> {
  @Column()
  name: string;

  @OneToMany(() => Question, (question) => question.category, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  questions: Question[];
}

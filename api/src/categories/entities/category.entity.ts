import { Column, Entity } from 'typeorm';
import { AbstractEntity } from 'src/database/abstract.entity';

@Entity()
export class Category extends AbstractEntity<Category> {
  @Column()
  name: string;
}

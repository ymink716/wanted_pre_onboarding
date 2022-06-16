import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @Column()
  compensation: number;

  @Column()
  tech: string;

  @Column()
  description: string;

  @ManyToOne(() => Company, (company) => company.postsId)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}

import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

@Entity()
export class JobPosting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  region: string;

  @Column()
  position: string;

  @Column()
  compensation: string;

  @Column()
  tech: string;

  @Column()
  description: string;
}

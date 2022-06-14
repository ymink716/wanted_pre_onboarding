import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  region: string;

  @Column()
  position: string;

  @Column()
  compensation: number;

  @Column()
  tech: string;

  @Column()
  description: string;
}

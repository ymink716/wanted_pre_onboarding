import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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
}

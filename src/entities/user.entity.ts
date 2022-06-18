import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { JobApplication } from './job-application.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Column()
  email: string;

  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.id)
  jobApplications: JobApplication[];
}

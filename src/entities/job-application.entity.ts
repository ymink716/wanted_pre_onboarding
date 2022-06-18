import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobPosting } from './job-posting.entity';
import { User } from './user.entity';

@Entity()
export class JobApplication extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.jobApplications)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => JobPosting, (jobPosting) => jobPosting.jobApplications)
  @JoinColumn({ name: 'job_posting_id' })
  jobPosting: JobPosting;
}

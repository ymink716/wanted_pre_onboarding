import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { JobApplication } from './job-application.entity';

@Entity()
export class JobPosting extends BaseEntity {
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

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Company, (company) => company.jobPostings)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.id)
  jobApplications: JobApplication[];
}

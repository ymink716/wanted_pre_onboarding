import { EntityRepository, Repository } from 'typeorm';
import { JobPosting } from './job-posting.entity';

@EntityRepository(JobPosting)
export class JobPostingRepository extends Repository<JobPosting> {}

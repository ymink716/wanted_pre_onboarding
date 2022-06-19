import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobApplication } from 'src/entities/job-application.entity';
import { JobPosting } from 'src/entities/job-posting.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { JobApplicationRepository } from './job-application.repository';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplicationRepository)
    private jobApplicationRepository: JobApplicationRepository,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(JobPosting)
    private jobPostingRepository: Repository<JobPosting>,
  ) {}

  async createJobApplication(
    createJobApplicationDto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    const { job_posting_id, user_id } = createJobApplicationDto;

    const user = await this.userRepository.findOne(user_id);
    if (!user) {
      throw new NotFoundException('일치하는 사용자가 없습니다.');
    }

    const jobPosting = await this.jobPostingRepository.findOne(job_posting_id);
    if (!jobPosting) {
      throw new NotFoundException('존재하지 않는 채용공고입니다.');
    }

    return this.jobApplicationRepository.createJobApplication(user, jobPosting);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobApplication } from 'src/entities/job-application.entity';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { JobApplicationRepository } from './job-application.repository';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplicationRepository)
    private jobApplicationRepository: JobApplicationRepository,
  ) {}

  createJobApplication(
    createJobApplicationDto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    return this.jobApplicationRepository.createJobApplication(
      createJobApplicationDto,
    );
  }
}

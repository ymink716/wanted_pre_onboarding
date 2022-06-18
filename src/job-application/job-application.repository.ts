import { EntityRepository, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { JobApplication } from 'src/entities/job-application.entity';
import { User } from 'src/entities/user.entity';
import { JobPosting } from 'src/entities/job-posting.entity';

@EntityRepository(JobApplication)
export class JobApplicationRepository extends Repository<JobApplication> {
  async createJobApplication(
    user: User,
    jobPosting: JobPosting,
  ): Promise<JobApplication> {
    const existedApplication = await this.find({ where: { user, jobPosting } });

    if (existedApplication.length > 0) {
      throw new BadRequestException('이미 지원한 채용공고입니다.');
    }

    const application = this.create({ user, jobPosting });
    await this.save(application);

    return application;
  }
}

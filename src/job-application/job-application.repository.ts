import { EntityRepository, Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { JobApplication } from 'src/entities/job-application.entity';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';

@EntityRepository(JobApplication)
export class JobApplicationRepository extends Repository<JobApplication> {
  async createJobApplication(
    createJobApplicationDto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    const { jobPostingId, userId } = createJobApplicationDto;

    const user = await this.createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw new NotFoundException('일치하는 사용자가 없습니다.');
    }

    const jobPosting = await this.createQueryBuilder('job-posting')
      .where('job-posting.id = :id', { id: jobPostingId })
      .getOne();

    if (!jobPosting) {
      throw new NotFoundException('존재하지 않는 채용공고입니다.');
    }

    const existedApplication = await this.find({ where: { user, jobPosting } });
    if (existedApplication) {
      throw new BadRequestException('이미 지원한 채용공고입니다.');
    }

    const application = this.create({ user, jobPosting });
    await this.save(application);

    return application;
  }
}

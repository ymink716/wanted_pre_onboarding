import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { JobPosting } from '../entities/job-posting.entity';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { NotFoundException } from '@nestjs/common';
import { Company } from 'src/entities/company.entity';

@EntityRepository(JobPosting)
export class JobPostingRepository extends Repository<JobPosting> {
  async createJobPosting(
    company: Company,
    createJobPostingDto: CreateJobPostingDto,
  ): Promise<JobPosting> {
    const { position, compensation, tech, description } = createJobPostingDto;

    const jobPosting = this.create({
      company,
      position,
      compensation,
      tech,
      description,
    });

    await this.save(jobPosting);
    return jobPosting;
  }

  // async updateJobPosting(
  //   id: number,
  //   updateJobPostingDto: UpdateJobPostingDto,
  // ): Promise<JobPosting> {
  //   const { position, compensation, tech, description } = updateJobPostingDto;

  //   const jobPosting = await this.findOne({ where: { id } });

  //   if (!jobPosting) {
  //     throw new NotFoundException('해당 공고를 찾을 수 없습니다.');
  //   }

  //   jobPosting.position = position;
  //   jobPosting.compensation = compensation;
  //   jobPosting.tech = tech;
  //   jobPosting.description = description;

  //   await this.save(jobPosting);
  //   return jobPosting;
  // }

  async getPostByKeyword(keyword: string): Promise<JobPosting[]> {
    const posts = await this.createQueryBuilder('job-posting')
      .select([
        'job-posting.id',
        'job-posting.position',
        'job-posting.compensation',
        'job-posting.tech',
        'company.name',
        'company.country',
        'company.region',
      ])
      .innerJoin('job-posting.company', 'company')
      .where('company.name LIKE :text', { text: `%${keyword}%` })
      .orWhere('company.country LIKE :text', { text: `%${keyword}%` })
      .orWhere('company.region LIKE :text', { text: `%${keyword}%` })
      .orWhere('job-posting.position LIKE :text', { text: `%${keyword}%` })
      .orWhere('job-posting.tech LIKE :text', { text: `%${keyword}%` })
      .orWhere('job-posting.description LIKE :text', { text: `%${keyword}%` })
      .getMany();

    return posts;
  }

  async getJobPostingById(id: number) {
    const jobPosting = await this.findOne(id, { relations: ['company'] });

    const idList = await this.find({
      where: { company: jobPosting.company },
      select: ['id'],
    });

    return { jobPosting, idList };
  }
}

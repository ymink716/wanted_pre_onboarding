import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { JobPosting } from '../entities/job-posting.entity';
import { JobPostingRepository } from './job-posting.repository';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { NotFoundException } from '@nestjs/common';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobPostingService {
  constructor(
    @InjectRepository(JobPostingRepository)
    private jobPostingRepository: JobPostingRepository,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async createJobPosting(
    createJobPostingDto: CreateJobPostingDto,
  ): Promise<JobPosting> {
    const { company_id } = createJobPostingDto;
    const company = await this.companyRepository.findOne(company_id);

    if (!company) {
      throw new NotFoundException('존재하지 않는 회사입니다.');
    }

    return this.jobPostingRepository.createJobPosting(
      company,
      createJobPostingDto,
    );
  }

  updateJobPosting(
    id: number,
    updateJobPostingDto: UpdateJobPostingDto,
  ): Promise<JobPosting> {
    return this.jobPostingRepository.updateJobPosting(id, updateJobPostingDto);
  }

  async deleteJobPosting(id: number): Promise<void> {
    const result = await this.jobPostingRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('해당 공고를 찾을 수 없습니다.');
    }
  }

  async getJobPostings(keyword: string): Promise<JobPosting[]> {
    if (!keyword) {
      return await this.jobPostingRepository.find({
        relations: ['company'],
        select: ['id', 'company', 'position', 'compensation', 'tech'],
      });
    } else {
      return this.jobPostingRepository.getPostByKeyword(keyword);
    }
  }

  getJobPostingById(id: number) {
    return this.jobPostingRepository.getJobPostingById(id);
  }
}

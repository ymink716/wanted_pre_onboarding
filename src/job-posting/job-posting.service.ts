import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { JobPosting } from '../entities/job-posting.entity';
import { JobPostingRepository } from './job-posting.repository';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { NotFoundException } from '@nestjs/common';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';
import { ResponseJobPostingDto } from './dto/response-job-posting.dto';

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
  ): Promise<ResponseJobPostingDto> {
    const { company_id } = createJobPostingDto;
    const company = await this.companyRepository.findOne(company_id);

    if (!company) {
      throw new NotFoundException('존재하지 않는 회사입니다.');
    }

    const jobPosting = await this.jobPostingRepository.createJobPosting(
      company,
      createJobPostingDto,
    );

    return ResponseJobPostingDto.fromEntity(jobPosting);
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

  async getJobPostings(keyword: string): Promise<ResponseJobPostingDto[]> {
    let posts;

    if (!keyword) {
      posts = await this.jobPostingRepository.find({ relations: ['company'] });
    } else {
      posts = await this.jobPostingRepository.getPostByKeyword(keyword);
    }

    const responseDtos = [];
    posts.map((p) => {
      responseDtos.push(ResponseJobPostingDto.fromEntity(p));
    });

    return responseDtos;
  }

  async getJobPostingById(id: number): Promise<ResponseJobPostingDto> {
    const { jobPosting, idList } =
      await this.jobPostingRepository.getJobPostingById(id);

    return ResponseJobPostingDto.getDetails(jobPosting, idList);
  }
}

/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { JobPosting } from 'src/entities/job-posting.entity';
import { CompanyRepository } from './company.repository';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { ResponseJobPostingDto } from './dto/response-job-posting.dto';
import { JobPostingRepository } from './job-posting.repository';
import { JobPostingService } from './job-posting.service';

const mockJobPostingRepository = {
  createJobPosting: jest.fn(),
  updateJobPosting: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  getPostByKeyword: jest.fn(),
  getJobPostingById: jest.fn(),
};

const mockCompanyRepository = {
  findOne: jest.fn()
};

describe('JobPostingService', () => {
  let service: JobPostingService;
  let jobPostingRepository: JobPostingRepository;
  let companyRepository: CompanyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobPostingService,
        { provide: getRepositoryToken(JobPostingRepository), useValue: mockJobPostingRepository },
        { provide: getRepositoryToken(Company), useValue: mockCompanyRepository },
      ],
    }).compile();

    service = module.get<JobPostingService>(JobPostingService);
    jobPostingRepository = module.get(getRepositoryToken(JobPostingRepository));
    companyRepository = module.get(getRepositoryToken(Company));
  });

  describe('createJobPosting', () => {
    const dto: CreateJobPostingDto = {
      company_id: 3,
      position: '백엔드 개발자', 
      compensation: 500000, 
      tech: 'java', 
      description: 'java 백엔드 개발자를 모집합니다.'
    };

    const company: Company = new Company();
    company.id = 3;
    company.name = '네이버';
    company.country = '한국';
    company.region = '경기';

    const posting: JobPosting = new JobPosting();
    posting.id = 1;
    posting.position = '백엔드 개발자';
    posting.tech = 'node.js';
    posting.compensation = 500000;
    posting.description = 'node.js 백엔드 개발자를 모집합니다.';
    posting.company = company;

  it("존재하지 않는 회사라면 에러를 반환합니다.", async () => {
    mockCompanyRepository.findOne.mockResolvedValue(undefined);
    const result = async () => await service.createJobPosting(dto);
    await expect(result).rejects.toThrowError(
      new NotFoundException('존재하지 않는 회사입니다.'),
    );
  });

  it("채용공고 등록에 성공합니다.", async () => {
    mockCompanyRepository.findOne.mockResolvedValue(company);
    mockJobPostingRepository.createJobPosting.mockResolvedValue(posting);
    const res = ResponseJobPostingDto.fromEntity(posting);
    const result = await service.createJobPosting(dto);
    await expect(result).toStrictEqual(res);
  });
});
});

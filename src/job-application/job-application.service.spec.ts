/* eslint-disable prettier/prettier */
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { JobApplication } from 'src/entities/job-application.entity';
import { JobPosting } from 'src/entities/job-posting.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JobApplicationRepository } from './job-application.repository';
import { JobApplicationService } from './job-application.service';

const mockApplicationRepository = { createJobApplication: jest.fn() }
const mockUserRepository = { findOne: jest.fn() }
const mockPostingRepository = { findOne: jest.fn() }

describe('JobApplicationService', () => {
  let service: JobApplicationService;
  let applicationRepository: JobApplicationRepository;
  let userRepository: Repository<User>;
  let postingRepository: Repository<JobPosting>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobApplicationService,
        { provide: getRepositoryToken(JobApplicationRepository), useValue: mockApplicationRepository },
        { provide: getRepositoryToken(JobPosting), useValue: mockPostingRepository },
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],

    }).compile();

    service = module.get<JobApplicationService>(JobApplicationService);
    applicationRepository = module.get(getRepositoryToken(JobApplicationRepository));
    userRepository = module.get(getRepositoryToken(User));
    postingRepository = module.get(getRepositoryToken(JobPosting));
  });

  describe("createJobApplication", () => {
    const user: User = new User();
    user.id = 1;
    user.name = '김철수';
    user.email = 'test@naver.com';

    const company: Company = new Company();
    company.id = 1;
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

    const application: JobApplication = new JobApplication();
    application.id = 1;
    application.jobPosting = posting;
    application.user = user;

    let job_posting_id, user_id;

    it('일치하는 사용자가 없는 경우 에러를 반환합니다.', async () => {
      job_posting_id = 1, user_id = 999
      mockUserRepository.findOne.mockResolvedValue(undefined);
      const result = async () => await service.createJobApplication({job_posting_id, user_id});
      await expect(result).rejects.toThrowError(
        new NotFoundException('일치하는 사용자가 없습니다.'),
      );
    });

    it('존재하지 않는 채용공고라면 에러를 반환합니다.', async () => {
      job_posting_id = 999, user_id = 1;
      mockUserRepository.findOne.mockResolvedValue(user);
      mockPostingRepository.findOne.mockResolvedValue(undefined);
      const result = async () => await service.createJobApplication({job_posting_id, user_id});
      await expect(result).rejects.toThrowError(
        new NotFoundException('존재하지 않는 채용공고입니다.'),
      );
    });

    it('이미 지원한 채용공고라면 에러를 반환합니다.', async () => {
      job_posting_id = 1, user_id = 1;
      mockUserRepository.findOne.mockResolvedValue(user);
      mockPostingRepository.findOne.mockResolvedValue(posting);
      mockApplicationRepository.createJobApplication.mockRejectedValue(
        new BadRequestException('이미 지원한 채용공고입니다.')
      );
      
      const result = async () => await service.createJobApplication({job_posting_id, user_id});
      
      await expect(result).rejects.toThrowError(
        new BadRequestException('이미 지원한 채용공고입니다.'),
      );
    });

    it("지원에 성공하고 지원 내역을 반환합니다.", async () => {
      job_posting_id = 1, user_id = 1;
      mockUserRepository.findOne.mockResolvedValue(user);
      mockPostingRepository.findOne.mockResolvedValue(posting);
      mockApplicationRepository.createJobApplication.mockResolvedValue(application);
      
      const result = await service.createJobApplication({job_posting_id, user_id});
      
      await expect(result).toEqual(application);
    })
  });
  
});

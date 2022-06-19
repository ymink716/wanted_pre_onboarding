/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { JobPosting } from 'src/entities/job-posting.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { ResponseJobPostingDto } from './dto/response-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { JobPostingRepository } from './job-posting.repository';
import { JobPostingService } from './job-posting.service';

const mockJobPostingRepository = {
  createJobPosting: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  getPostByKeyword: jest.fn(),
  getJobPostingById: jest.fn(),
};

const mockCompanyRepository = {
  findOne: jest.fn()
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

const postingId = 1;

describe('JobPostingService', () => {
  let service: JobPostingService;
  let jobPostingRepository: JobPostingRepository;
  let companyRepository: Repository<Company>;

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
    const createDto: CreateJobPostingDto = {
      company_id: 3,
      position: '백엔드 개발자', 
      compensation: 500000, 
      tech: 'java', 
      description: 'java 백엔드 개발자를 모집합니다.'
    };

    test("존재하지 않는 회사라면 에러를 반환합니다.", async () => {
      mockCompanyRepository.findOne.mockResolvedValue(undefined);
      const result = async () => await service.createJobPosting(createDto);
      await expect(result).rejects.toThrowError(
        new NotFoundException('존재하지 않는 회사입니다.'),
      );
    });

    test("채용공고 등록에 성공하고 생성된 채용공고를 반환합니다.", async () => {
      mockCompanyRepository.findOne.mockResolvedValue(company);
      mockJobPostingRepository.createJobPosting.mockResolvedValue(posting);
      const res = ResponseJobPostingDto.fromEntity(posting);
      const result = await service.createJobPosting(createDto);

      expect(mockCompanyRepository.findOne).toBeCalledWith(createDto.company_id);
      expect(mockJobPostingRepository.createJobPosting).toBeCalledWith(company, createDto);
      expect(result).toStrictEqual(res);
    });
  });

  describe("updateJobPosting", () => {
    const updateDto: UpdateJobPostingDto = {
      position: '백엔드 개발자', 
      compensation: 500000, 
      tech: 'node.js', 
      description: 'node.js 백엔드 개발자를 모집합니다. (수정)'
    }


    const updatedPosting: JobPosting = new JobPosting();
    updatedPosting.id = postingId;
    updatedPosting.company = company;
    updatedPosting.position = updateDto.position;
    updatedPosting.compensation = updateDto.compensation;
    updatedPosting.tech = updateDto.tech;
    updatedPosting.description = updateDto.description;

    test("해당 채용공고를 찾지 못하면 에러를 반환합니다.", async () => {
      mockJobPostingRepository.findOne.mockResolvedValue(undefined);
      const result = async () => await service.updateJobPosting(999, updateDto);
      await expect(result).rejects.toThrowError(
        new NotFoundException('해당 공고를 찾을 수 없습니다.'),
      );
    });

    test("채용공고 수정에 성공합니다.", async () => {
      mockJobPostingRepository.findOne.mockResolvedValue(posting);
      mockJobPostingRepository.save.mockResolvedValue(posting);

      const result = await service.updateJobPosting(postingId, updateDto);

      expect(mockJobPostingRepository.findOne).toHaveBeenCalledWith({ where: { id: postingId }});
      expect(mockJobPostingRepository.save).toHaveBeenCalledWith(updatedPosting);
      expect(result.description).toEqual(updatedPosting.description);
    });
  });

  describe("deleteJobPosting", () => {
    test("해당 공고 삭제에 성공합니다.", async () => {
      mockJobPostingRepository.delete.mockResolvedValue({} as DeleteResult);
      
      const result = await service.deleteJobPosting(postingId);

      expect(mockJobPostingRepository.delete).toHaveBeenCalledWith({ id: postingId });
      expect(result).toBeUndefined();
    });

    test("해당 공고를 찾을 수 없다면 에러를 반환합니다.", async () => {
      mockJobPostingRepository.delete.mockResolvedValue({ affected: 0, raw: [] });
      
      const result = async () => await service.deleteJobPosting(999);
      
      await expect(result).rejects.toThrowError(
        new NotFoundException('해당 공고를 찾을 수 없습니다.'),
      );
    });
  });

  describe("getJobPostings", () => {
    const posting2 = new JobPosting();
    posting2.id = 2;
    posting2.position = '백엔드 개발자';
    posting2.tech = 'java';
    posting2.compensation = 500000;
    posting2.description = 'java 백엔드 개발자를 모집합니다.';
    posting2.company = company;

    const posting3 = new JobPosting();
    posting3.id = 3;
    posting3.position = '프론트엔드 개발자';
    posting3.tech = '리액트';
    posting3.compensation = 500000;
    posting3.description = '리액트 개발자를 모집합니다.';
    posting3.company = company;

    const postingList: JobPosting[] = [posting, posting2, posting3];
    const searchedList: JobPosting[] = [posting, posting2];
    let keyword;

    test("키워드가 없다면 전체 공고 목록을 반환합니다.", async () => {
      mockJobPostingRepository.find.mockResolvedValue(postingList);
      const result = await service.getJobPostings(keyword);
      
      const resDtos = [];
      postingList.map(p => {
        resDtos.push(ResponseJobPostingDto.fromEntity(p));
      });
      
      expect(mockJobPostingRepository.find).toBeCalled();
      expect(result).toStrictEqual(resDtos);  
    });

    test("키워드가 있다면 키워드로 검색한 목록을 반환합니다.", async () => {
      keyword = '백엔드';
      mockJobPostingRepository.getPostByKeyword.mockResolvedValue(searchedList);
      const result = await service.getJobPostings(keyword);
      
      const resDtos = [];
      searchedList.map(p => {
        resDtos.push(ResponseJobPostingDto.fromEntity(p));
      });
      
      expect(mockJobPostingRepository.getPostByKeyword).toBeCalledWith(keyword);
      expect(result).toStrictEqual(resDtos);  
    });
  });

  describe("getJobPostingById", () => {
    const idList = [ {id: 1}, {id: 2}, {id: 3} ];

    test("해당 공고를 찾을 수 없다면 에러를 반환합니다.", async () => {
      mockJobPostingRepository.findOne.mockResolvedValue(undefined);
      
      const result = async () => await service.getJobPostingById(999);
      
      await expect(result).rejects.toThrowError(
        new NotFoundException('해당 공고를 찾을 수 없습니다.'),
      );
    });

    test("채용공고 하나를 찾아 세부사항을 반환합니다.", async () => {
      mockJobPostingRepository.findOne.mockResolvedValue(posting);
      mockJobPostingRepository.find.mockResolvedValue(idList);

      const result = await service.getJobPostingById(postingId);

      expect(mockJobPostingRepository.findOne).toHaveBeenCalledWith(
        postingId, 
        {relations: ['company']}
      );
      expect(mockJobPostingRepository.find).toHaveBeenCalled();
      const resDto = ResponseJobPostingDto.getDetails(posting, idList);
      expect(result).toEqual(resDto);
    });
  })
});

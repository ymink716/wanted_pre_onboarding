import { Test, TestingModule } from '@nestjs/testing';
import { JobPostingController } from './job-posting.controller';
import { JobPostingService } from './job-posting.service';

describe('JobPostingController', () => {
  let jobPostingController: JobPostingController;
  let jobPostingService: JobPostingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPostingController],
      providers: [JobPostingService],
    }).compile();

    jobPostingController =
      module.get<JobPostingController>(JobPostingController);
    jobPostingService = module.get<JobPostingService>(JobPostingService);
  });

  // describe('getJobPostings', () => {
  //   it('should return an array of posts', async () => {
  //     const result = [
  //       {
  //         id: 1,
  //         company_name: '네이버',
  //         country: '한국',
  //         region: '경기',
  //         position: '백엔드 개발자',
  //         compensation: 500000,
  //         tech: 'node.js',
  //       },
  //     ];
  //     const keyword = undefined;
  //     jest
  //       .spyOn(jobPostingService, 'getJobPostings')
  //       .mockImplementation(() => result);

  //     expect(await jobPostingController.getJobPostings(keyword)).toBe(result);
  //   });
  // });
});

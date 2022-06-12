import { Controller } from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';

@Controller('job-postings')
export class JobPostingsController {
  constructor(private jobPostingsService: JobPostingsService) {}
}

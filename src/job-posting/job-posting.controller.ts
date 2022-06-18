import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { JobPosting } from '../entities/job-posting.entity';
import { JobPostingService } from './job-posting.service';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';

@Controller('posts')
export class JobPostingController {
  constructor(private jobPostingService: JobPostingService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  createJobPosting(
    @Body() createJobPostingDto: CreateJobPostingDto,
  ): Promise<JobPosting> {
    return this.jobPostingService.createJobPosting(createJobPostingDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateJobPosting(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobPostingDto: UpdateJobPostingDto,
  ): Promise<JobPosting> {
    return this.jobPostingService.updateJobPosting(id, updateJobPostingDto);
  }

  @Delete('/:id')
  deleteJobPosting(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.jobPostingService.deleteJobPosting(id);
  }

  @Get('/')
  getJobPostings(@Query('search') keyword: string): Promise<JobPosting[]> {
    return this.jobPostingService.getJobPostings(keyword);
  }

  @Get('/:id')
  getJobPostingById(@Param('id', ParseIntPipe) id: number) {
    return this.jobPostingService.getJobPostingById(id);
  }
}

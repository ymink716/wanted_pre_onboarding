import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JobApplication } from 'src/entities/job-application.entity';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { JobApplicationService } from './job-application.service';

@Controller('application')
export class JobApplicationController {
  constructor(private jobApplicationService: JobApplicationService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  createJobApplication(
    @Body() createJobApplicationDto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    return this.jobApplicationService.createJobApplication(
      createJobApplicationDto,
    );
  }
}

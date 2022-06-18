import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from 'src/entities/job-posting.entity';
import { User } from 'src/entities/user.entity';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationRepository } from './job-application.repository';
import { JobApplicationService } from './job-application.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobApplicationRepository, User, JobPosting]),
  ],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
})
export class JobApplicationModule {}

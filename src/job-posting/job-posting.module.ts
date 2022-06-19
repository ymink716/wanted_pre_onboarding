import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';
import { JobPostingController } from './job-posting.controller';
import { JobPostingRepository } from './job-posting.repository';
import { JobPostingService } from './job-posting.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobPostingRepository, CompanyRepository]),
  ],
  controllers: [JobPostingController],
  providers: [JobPostingService],
})
export class JobPostingModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { JobPostingController } from './job-posting.controller';
import { JobPostingRepository } from './job-posting.repository';
import { JobPostingService } from './job-posting.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobPostingRepository, Company])],
  controllers: [JobPostingController],
  providers: [JobPostingService],
})
export class JobPostingModule {}

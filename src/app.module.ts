import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../configs/typeorm.config';
import { JobPostingsModule } from './job-postings/job-postings.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), JobPostingsModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { JobPostingModule } from './job-posting/job-posting.module';
import { JobApplicationModule } from './job-application/job-application.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    JobPostingModule,
    JobApplicationModule,
  ],
})
export class AppModule {}

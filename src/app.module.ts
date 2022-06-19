import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPostingModule } from './job-posting/job-posting.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          database: configService.get('DB_DATABASE'),
          password: configService.get('DB_PASSWORD'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
        };
      },
    }),
    JobPostingModule,
    JobApplicationModule,
  ],
})
export class AppModule {}

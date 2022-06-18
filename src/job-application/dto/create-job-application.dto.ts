import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateJobApplicationDto {
  @IsNumber()
  @IsNotEmpty()
  job_posting_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}

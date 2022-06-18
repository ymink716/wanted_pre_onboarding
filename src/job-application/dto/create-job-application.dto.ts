import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateJobApplicationDto {
  @IsNumber()
  @IsNotEmpty()
  jobPostingId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

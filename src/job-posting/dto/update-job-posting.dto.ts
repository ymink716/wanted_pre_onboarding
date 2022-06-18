import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class UpdateJobPostingDto {
  @IsString()
  @IsNotEmpty()
  position: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  compensation: number;

  @IsString()
  @IsNotEmpty()
  tech: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

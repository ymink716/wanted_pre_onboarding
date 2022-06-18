import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateJobPostingDto {
  @IsString()
  @IsNotEmpty()
  position: string;

  @IsNumber()
  @IsNotEmpty()
  compensation: number;

  @IsString()
  @IsNotEmpty()
  tech: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

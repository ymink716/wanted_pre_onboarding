import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsNumber()
  compensation: number;

  @IsString()
  tech: string;

  @IsString()
  description: string;
}

import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { JobPosting } from 'src/entities/job-posting.entity';

export class ResponseJobPostingDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  compensation: number;

  @IsString()
  @IsNotEmpty()
  tech: string;

  @IsString()
  description: string;

  @IsArray()
  others: number[];

  static fromEntity(jobPosting: JobPosting) {
    const dto = new ResponseJobPostingDto();

    dto.id = jobPosting.id;
    dto.company_name = jobPosting.company.name;
    dto.country = jobPosting.company.country;
    dto.region = jobPosting.company.region;
    dto.position = jobPosting.position;
    dto.compensation = jobPosting.compensation;
    dto.tech = jobPosting.tech;

    return dto;
  }

  static getDetails(jobPosting: JobPosting, idList: { id: number }[]) {
    const dto = this.fromEntity(jobPosting);
    dto.description = jobPosting.description;

    const others = [];
    idList.map((o) => others.push(o.id));
    dto.others = others;

    return dto;
  }
}

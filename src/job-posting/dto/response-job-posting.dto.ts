import { Injectable } from '@nestjs/common';
import { JobPosting } from 'src/entities/job-posting.entity';

@Injectable()
export class ResponseJobPostingDto {
  id: number;

  company_name: string;

  country: string;

  region: string;

  position: string;

  compensation: number;

  tech: string;

  description: string;

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

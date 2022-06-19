import { EntityRepository, Repository } from 'typeorm';
import { Company } from 'src/entities/company.entity';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {}

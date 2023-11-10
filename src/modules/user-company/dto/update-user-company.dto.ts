import { PartialType } from '@nestjs/swagger';
import { CreateUserCompanyDto } from './create-user-company.dto';

export class UpdateUserCompanyDto extends PartialType(CreateUserCompanyDto) {}

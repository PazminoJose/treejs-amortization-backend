import { PartialType } from '@nestjs/swagger';
import { CreateCompanyCreditTypeDto } from './create-company-credit-type.dto';

export class UpdateCompanyCreditTypeDto extends PartialType(CreateCompanyCreditTypeDto) {}

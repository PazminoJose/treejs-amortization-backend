import { PartialType } from '@nestjs/swagger';
import { CreateCreditTypeDto } from './create-credit-type.dto';

export class UpdateCreditTypeDto extends PartialType(CreateCreditTypeDto) {}

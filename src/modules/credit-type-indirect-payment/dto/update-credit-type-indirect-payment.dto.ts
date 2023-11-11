import { PartialType } from '@nestjs/swagger';
import { CreateCreditTypeIndirectPaymentDto } from './create-credit-type-indirect-payment.dto';

export class UpdateCreditTypeIndirectPaymentDto extends PartialType(CreateCreditTypeIndirectPaymentDto) {}

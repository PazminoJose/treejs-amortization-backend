import { PartialType } from '@nestjs/swagger';
import { CreateIndirectPaymentDto } from './create-indirect-payment.dto';

export class UpdateIndirectPaymentDto extends PartialType(CreateIndirectPaymentDto) {}

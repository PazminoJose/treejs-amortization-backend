import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class CreateCreditTypeIndirectPaymentDto {
  @ApiProperty()
  @IsMongoId()
  creditType: string;

  @ApiProperty()
  @IsMongoId()
  indirectPayment: string;
}

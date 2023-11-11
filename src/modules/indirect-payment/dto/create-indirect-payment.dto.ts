import { UppercaseTransform } from "@commons";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateIndirectPaymentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @UppercaseTransform()
  name: string;

  @ApiProperty()
  @IsPositive()
  mount: number;
}

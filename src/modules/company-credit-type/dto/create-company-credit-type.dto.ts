import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class CreateCompanyCreditTypeDto {
  @ApiProperty()
  @IsMongoId()
  company: string;

  @ApiProperty()
  @IsMongoId()
  creditType: string;
}

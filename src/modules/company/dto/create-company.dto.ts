import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ruc: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  logo?: string;
}

import { IsIdCard, IsNullable } from "@commons";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePersonDto {
    @ApiProperty()
    @IsIdCard()
    dni: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;
}

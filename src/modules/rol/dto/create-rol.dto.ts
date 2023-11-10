import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateRolDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    name: string;
}

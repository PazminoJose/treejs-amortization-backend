import { ApiProperty } from "@nestjs/swagger";
import {
    IsEmail,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength
} from "class-validator";
import { IsNullable } from "src/commons/decorators/is-nullable.decorator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty()
    @IsNullable()
    @IsOptional()
    @IsMongoId()
    person: string | null;
}

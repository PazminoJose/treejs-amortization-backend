import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class CreateUserRolDto {
    @ApiProperty()
    @IsMongoId()
    user: string;

    @ApiProperty()
    @IsMongoId()
    rol: string;
}

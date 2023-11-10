import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreatePersonDto } from "src/modules/person/dto/create-person.dto";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";

export class RegisterDto {
  @ApiProperty()
  @Type(() => CreateUserDto)
  @ValidateNested()
  user: CreateUserDto;

  @ApiProperty()
  @Type(() => CreatePersonDto)
  @ValidateNested()
  person: CreatePersonDto;
}

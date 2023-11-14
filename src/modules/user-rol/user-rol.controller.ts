import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserRolDto } from "./dto/create-user-rol.dto";
import { UserRolService } from "./user-rol.service";
@ApiTags("user-rol")
@Controller("user-rol")
export class UserRolController {
  constructor(private readonly userRolService: UserRolService) {}

  @Post()
  create(@Body() createUserRolDto: CreateUserRolDto) {
    return this.userRolService.create(createUserRolDto);
  }

  @Get("/user/:userId")
  findByUserId(@Param("userId") userId: string) {
    return this.userRolService.findByUserId(userId);
  }
}

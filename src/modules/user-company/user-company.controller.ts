import { Roles } from "@commons";
import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateUserCompanyDto } from "./dto/create-user-company.dto";
import { UpdateUserCompanyDto } from "./dto/update-user-company.dto";
import { UserCompanyService } from "./user-company.service";

@ApiTags("user-company")
@ApiBearerAuth()
@Roles("ADMIN")
@Controller("user-company")
export class UserCompanyController {
  constructor(private readonly userCompanyService: UserCompanyService) {}

  @Post()
  create(@Body() createUserCompanyDto: CreateUserCompanyDto) {
    return this.userCompanyService.create(createUserCompanyDto);
  }

  @Get()
  findAll() {
    return this.userCompanyService.findAll();
  }

  @Get("user/:userId")
  findByUserId(@Param("userId") userId: string) {
    return this.userCompanyService.findByUserId(userId);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserCompanyDto: UpdateUserCompanyDto) {
    return this.userCompanyService.update(id, updateUserCompanyDto);
  }
}

import { Roles } from "@commons";
import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@ApiTags("company")
@ApiBearerAuth()
@Roles("ADMIN")
@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Roles("ALL_LOGGED_USERS")
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.companyService.findById(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }
}

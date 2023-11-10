import { Roles } from "@commons";
import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CompanyCreditTypeService } from "./company-credit-type.service";
import { CreateCompanyCreditTypeDto } from "./dto/create-company-credit-type.dto";
import { UpdateCompanyCreditTypeDto } from "./dto/update-company-credit-type.dto";

@ApiTags("company-credit-type")
@ApiBearerAuth()
@Roles("ADMIN")
@Controller("company-credit-type")
export class CompanyCreditTypeController {
  constructor(private readonly companyCreditTypeService: CompanyCreditTypeService) {}

  @Post()
  create(@Body() createCompanyCreditTypeDto: CreateCompanyCreditTypeDto) {
    return this.companyCreditTypeService.create(createCompanyCreditTypeDto);
  }

  @Get()
  findAll() {
    return this.companyCreditTypeService.findAll();
  }

  @Get(":companyId")
  findByCompanyId(@Param("companyId") companyId: string) {
    return this.companyCreditTypeService.findByCompanyId(companyId);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCompanyCreditTypeDto: UpdateCompanyCreditTypeDto) {
    return this.companyCreditTypeService.update(id, updateCompanyCreditTypeDto);
  }
}

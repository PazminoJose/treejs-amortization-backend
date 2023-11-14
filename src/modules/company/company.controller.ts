import { FilesUploadInterceptor, FolderConstants, Roles, UploadedMulterFiles } from "@commons";
import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
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
  @UseInterceptors(
    FilesUploadInterceptor([{ name: "logo", maxCount: 1 }], { destination: FolderConstants.getLogosPath() })
  )
  create(@Body() createCompanyDto: CreateCompanyDto, @UploadedFiles() files: UploadedMulterFiles) {
    return this.companyService.create(createCompanyDto, files);
  }

  @Roles("ALL_LOGGED_USERS")
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Roles("ALL_LOGGED_USERS")
  @Get("combo")
  findAllCombo() {
    return this.companyService.findAllCombo();
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

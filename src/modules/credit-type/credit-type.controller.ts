import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreditTypeService } from "./credit-type.service";
import { CreateCreditTypeDto } from "./dto/create-credit-type.dto";
import { UpdateCreditTypeDto } from "./dto/update-credit-type.dto";

@ApiTags("credit-type")
@ApiBearerAuth()
@Controller("credit-type")
export class CreditTypeController {
  constructor(private readonly creditTypeService: CreditTypeService) {}

  @Post()
  create(@Body() createCreditTypeDto: CreateCreditTypeDto) {
    return this.creditTypeService.create(createCreditTypeDto);
  }

  @Get()
  findAll() {
    return this.creditTypeService.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.creditTypeService.findById(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCreditTypeDto: UpdateCreditTypeDto) {
    return this.creditTypeService.update(id, updateCreditTypeDto);
  }
}

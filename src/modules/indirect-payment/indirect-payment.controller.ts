import { Roles } from "@commons";
import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateIndirectPaymentDto } from "./dto/create-indirect-payment.dto";
import { UpdateIndirectPaymentDto } from "./dto/update-indirect-payment.dto";
import { IndirectPaymentService } from "./indirect-payment.service";

@ApiTags("indirect-payment")
@ApiBearerAuth()
@Roles("ADMIN")
@Controller("indirect-payment")
export class IndirectPaymentController {
  constructor(private readonly indirectPaymentService: IndirectPaymentService) {}

  @Post()
  create(@Body() createIndirectPaymentDto: CreateIndirectPaymentDto) {
    return this.indirectPaymentService.create(createIndirectPaymentDto);
  }

  @Get()
  findAll() {
    return this.indirectPaymentService.findAll();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateIndirectPaymentDto: UpdateIndirectPaymentDto) {
    return this.indirectPaymentService.update(id, updateIndirectPaymentDto);
  }
}

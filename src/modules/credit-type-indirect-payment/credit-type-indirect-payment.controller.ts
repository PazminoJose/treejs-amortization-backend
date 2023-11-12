import { Roles } from "@commons";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreditTypeIndirectPaymentService } from "./credit-type-indirect-payment.service";
import { CreateCreditTypeIndirectPaymentDto } from "./dto/create-credit-type-indirect-payment.dto";

@ApiTags("credit-type-indirect-payment")
@ApiBearerAuth()
@Roles("ADMIN")
@Controller("credit-type-indirect-payment")
export class CreditTypeIndirectPaymentController {
  constructor(private readonly creditTypeIndirectPaymentService: CreditTypeIndirectPaymentService) {}

  @Post()
  create(@Body() createCreditTypeIndirectPaymentDto: CreateCreditTypeIndirectPaymentDto) {
    return this.creditTypeIndirectPaymentService.create(createCreditTypeIndirectPaymentDto);
  }

  @Get()
  findAll() {
    return this.creditTypeIndirectPaymentService.findAll();
  }

  @Get("all-with-indirect-payment")
  findAllWithIndirectPayment() {
    return this.creditTypeIndirectPaymentService.findAllWithIndirectPayment();
  }

  @Get("credit-type/:creditTypeId")
  @Roles("ALL_LOGGED_USERS")
  findByCreditTypeId(@Param("creditTypeId") creditTypeId: string) {
    return this.creditTypeIndirectPaymentService.findByCreditTypeId(creditTypeId);
  }
}

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CreditTypeModule } from "../credit-type/credit-type.module";
import { CreditTypeIndirectPaymentController } from "./credit-type-indirect-payment.controller";
import { CreditTypeIndirectPaymentService } from "./credit-type-indirect-payment.service";
import {
  CreditTypeIndirectPayment,
  CreditTypeIndirectPaymentSchema
} from "./schemas/credit-type-indirect-payment.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CreditTypeIndirectPayment.name,
        schema: CreditTypeIndirectPaymentSchema
      }
    ]),
    CreditTypeModule
  ],
  controllers: [CreditTypeIndirectPaymentController],
  providers: [CreditTypeIndirectPaymentService]
})
export class CreditTypeIndirectPaymentModule {}

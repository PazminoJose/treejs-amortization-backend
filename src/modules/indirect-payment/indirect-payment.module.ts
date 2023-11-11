import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IndirectPaymentController } from "./indirect-payment.controller";
import { IndirectPaymentService } from "./indirect-payment.service";
import { IndirectPayment, IndirectPaymentSchema } from "./schemas/indirect-payment.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: IndirectPayment.name,
        schema: IndirectPaymentSchema
      }
    ])
  ],
  controllers: [IndirectPaymentController],
  providers: [IndirectPaymentService]
})
export class IndirectPaymentModule {}

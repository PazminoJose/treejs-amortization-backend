import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CreditTypeController } from "./credit-type.controller";
import { CreditTypeService } from "./credit-type.service";
import { CreditType, CreditTypeSchema } from "./schemas/credit-type.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CreditType.name,
        schema: CreditTypeSchema
      }
    ])
  ],
  controllers: [CreditTypeController],
  providers: [CreditTypeService],
  exports: [CreditTypeService]
})
export class CreditTypeModule {}

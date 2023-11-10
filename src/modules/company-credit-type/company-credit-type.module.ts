import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CompanyCreditTypeController } from "./company-credit-type.controller";
import { CompanyCreditTypeService } from "./company-credit-type.service";
import { CompanyCreditType, CompanyCreditTypeSchema } from "./schemas/company-credit-type";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompanyCreditType.name,
        schema: CompanyCreditTypeSchema
      }
    ])
  ],
  controllers: [CompanyCreditTypeController],
  providers: [CompanyCreditTypeService]
})
export class CompanyCreditTypeModule {}

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserCompany, UserCompanySchema } from "./schemas/user-company.schema";
import { UserCompanyController } from "./user-company.controller";
import { UserCompanyService } from "./user-company.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserCompany.name,
        schema: UserCompanySchema
      }
    ])
  ],
  controllers: [UserCompanyController],
  providers: [UserCompanyService],
  exports: [UserCompanyService]
})
export class UserCompanyModule {}

import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { FolderConstants } from "./commons/constants";
import { AllExceptionsFilter } from "./commons/filters";
import { AuthModule } from "./modules/auth/auth.module";
import { CompanyCreditTypeModule } from "./modules/company-credit-type/company-credit-type.module";
import { CompanyModule } from "./modules/company/company.module";
import { CreditTypeModule } from "./modules/credit-type/credit-type.module";
import { PersonModule } from "./modules/person/person.module";
import { RolModule } from "./modules/rol/rol.module";
import { UserCompanyModule } from "./modules/user-company/user-company.module";
import { UserRolModule } from "./modules/user-rol/user-rol.module";
import { UserModule } from "./modules/user/user.module";
import { IndirectPaymentModule } from './modules/indirect-payment/indirect-payment.module';
import { CreditTypeIndirectPaymentModule } from './modules/credit-type-indirect-payment/credit-type-indirect-payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: FolderConstants.getPublicPath(),
      serveRoot: "/"
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get("DB_MONGO")
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    CompanyModule,
    RolModule,
    UserRolModule,
    PersonModule,
    UserModule,
    UserCompanyModule,
    CreditTypeModule,
    CompanyCreditTypeModule,
    IndirectPaymentModule,
    CreditTypeIndirectPaymentModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {}

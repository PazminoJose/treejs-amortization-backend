import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PersonModule } from "../person/person.module";
import { UserRolModule } from "../user-rol/user-rol.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>("JWT_SECRET")
        };
      }
    }),
    UserModule,
    UserRolModule,
    PersonModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

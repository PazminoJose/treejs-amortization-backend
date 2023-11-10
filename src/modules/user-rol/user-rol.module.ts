import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RolSchema } from "../rol/schemas/rol.schema";
import { UserRol } from "./schemas/user-rol.schema";
import { UserRolController } from "./user-rol.controller";
import { UserRolService } from "./user-rol.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserRol.name,
        schema: RolSchema
      }
    ])
  ],
  controllers: [UserRolController],
  providers: [UserRolService],
  exports: [UserRolService]
})
export class UserRolModule {}

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RolController } from "./rol.controller";
import { RolService } from "./rol.service";
import { Rol, RolSchema } from "./schemas/rol.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rol.name,
        schema: RolSchema
      }
    ])
  ],
  controllers: [RolController],
  providers: [RolService],
  exports: [RolService]
})
export class RolModule {}

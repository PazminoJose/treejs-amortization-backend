import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, RolSchema } from './schemas/rol.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rol.name,
        schema: RolSchema,
      },
    ]),
  ],
  controllers: [RolController],
  providers: [RolService]
})
export class RolModule {}

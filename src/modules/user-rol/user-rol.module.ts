import { Module } from '@nestjs/common';
import { UserRolService } from './user-rol.service';
import { UserRolController } from './user-rol.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRol } from './schemas/user-rol.schema';
import { RolSchema } from '../rol/schemas/rol.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserRol.name,
        schema: RolSchema,
      },
    ]),
  ],
  controllers: [UserRolController],
  providers: [UserRolService]
})
export class UserRolModule {}

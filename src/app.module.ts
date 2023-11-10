import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolModule } from './modules/rol/rol.module';
import { UserRolModule } from './modules/user-rol/user-rol.module';
import { PersonModule } from './modules/person/person.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [RolModule, UserRolModule, PersonModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

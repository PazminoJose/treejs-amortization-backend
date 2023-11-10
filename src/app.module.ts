import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FolderConstants } from './commons/constants';
import { AuthModule } from './modules/auth/auth.module';
import { RolModule } from './modules/rol/rol.module';
import { UserRolModule } from './modules/user-rol/user-rol.module';
import { PersonModule } from './modules/person/person.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: FolderConstants.getPublicPath(),
      serveRoot: '/',
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_MONGO'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RolModule,
    UserRolModule,
    PersonModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

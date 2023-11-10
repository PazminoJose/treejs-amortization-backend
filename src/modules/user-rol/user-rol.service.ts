import { Injectable } from '@nestjs/common';
import { CreateUserRolDto } from './dto/create-user-rol.dto';
import { UpdateUserRolDto } from './dto/update-user-rol.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserRol, UserRolDocument } from './schemas/user-rol.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRolService {
  constructor(@InjectModel(UserRol.name) private userRolModel: Model<UserRolDocument> ) { }
  async create(createUserRolDto: CreateUserRolDto) {
    const createdUserRol = await this.userRolModel.create(createUserRolDto);
    return createdUserRol;
  }


  async findOne(userId: string) {
    const foundUserRol = (await this.userRolModel.findOne({user: userId})).populate("rol");
    return foundUserRol;
  }
  

}

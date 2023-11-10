import { Injectable } from '@nestjs/common';
import { CreateUserRolDto } from './dto/create-user-rol.dto';
import { UpdateUserRolDto } from './dto/update-user-rol.dto';

@Injectable()
export class UserRolService {
  create(createUserRolDto: CreateUserRolDto) {
    return 'This action adds a new userRol';
  }

  findAll() {
    return `This action returns all userRol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRol`;
  }

  update(id: number, updateUserRolDto: UpdateUserRolDto) {
    return `This action updates a #${id} userRol`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRol`;
  }
}

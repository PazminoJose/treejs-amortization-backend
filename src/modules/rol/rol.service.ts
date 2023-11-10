import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol, RolDocument } from './schemas/rol.schema';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { HttpErrorException } from '@commons';

@Injectable()
export class RolService {
  constructor(@InjectModel(Rol.name) private readonly rolModel: Model<RolDocument>) { }
  async create(createRolDto: CreateRolDto) {
    const foundRol = await this.rolModel.findOne({ name: createRolDto.name });
    if (foundRol) throw new HttpErrorException("Error al encontrar el rol", HttpStatus.BAD_REQUEST);
    const createdRol = await this.rolModel.create(createRolDto);
    return createdRol;
  }

  findAll() {
    return this.rolModel.find();
  }

  async findOne(id: string) {
    const foundRol = await this.rolModel.findById(id);
    if (!foundRol) throw new HttpErrorException("Error al encontrar el rol", HttpStatus.BAD_REQUEST);
    return foundRol;
  }
}

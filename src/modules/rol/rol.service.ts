import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol, RolDocument } from './schemas/rol.schema';
import { Model } from "mongoose";

@Injectable()

export class RolService {
  constructor(@Injectable(Rol.name) private readonly rolModel: Model<RolDocument>) { }
  async create(createRolDto: CreateRolDto) {
    const foundRol = await this.rolModel.findOne({ name: createRolDto.name });
    if (foundRol) throw new Error(`Rol ${createRolDto.name} already exists`);
    const createdRol = await this.rolModel.create(createRolDto);
    return createdRol;
  }

  findAll() {
    return this.rolModel.find();
  }

  async findOne(id: string) {
    const foundRol = await this.rolModel.findById(id);
    if (!foundRol) throw new Error(`Rol ${id} not found`);
    return foundRol;
  }

  update(id: string, updateRolDto: UpdateRolDto) {
    return `This action updates a #${id} rol`;
  }

  remove(id: string) {
    return `This action removes a #${id} rol`;
  }
}

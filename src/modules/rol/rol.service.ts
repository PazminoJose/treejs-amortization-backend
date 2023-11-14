import { HttpErrorException } from "@commons";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateRolDto } from "./dto/create-rol.dto";
import { Rol, RolDocument } from "./schemas/rol.schema";

@Injectable()
export class RolService {
  constructor(@InjectModel(Rol.name) private readonly rolModel: Model<RolDocument>) {}
  async create(createRolDto: CreateRolDto) {
    const foundRol = await this.rolModel.findOne({ name: createRolDto.name });
    if (foundRol) throw new HttpErrorException("Error al encontrar el rol", HttpStatus.BAD_REQUEST);
    const createdRol = await this.rolModel.create(createRolDto);
    return createdRol;
  }

  findAll() {
    return this.rolModel.find();
  }

  async findByName(name: string) {
    const foundRol = await this.rolModel.findOne({ name });
    if (!foundRol) throw new HttpErrorException("Rol no encontrado", HttpStatus.NOT_FOUND);
    return foundRol;
  }

  async findOne(id: string) {
    const foundRol = await this.rolModel.findById(id);
    if (!foundRol) throw new HttpErrorException("Error al encontrar el rol", HttpStatus.BAD_REQUEST);
    return foundRol;
  }
}

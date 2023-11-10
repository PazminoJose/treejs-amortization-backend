import { HttpErrorException } from "@commons";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserCompanyDto } from "./dto/create-user-company.dto";
import { UpdateUserCompanyDto } from "./dto/update-user-company.dto";
import { UserCompany, UserCompanyDocument } from "./schemas/user-company.schema";

@Injectable()
export class UserCompanyService {
  constructor(@InjectModel(UserCompany.name) private userCompanyModel: Model<UserCompanyDocument>) {}

  async create(createUserCompanyDto: CreateUserCompanyDto) {
    const foundUserCompany = await this.userCompanyModel.findOne({
      user: createUserCompanyDto.user,
      company: createUserCompanyDto.company
    });
    if (foundUserCompany)
      throw new HttpErrorException("El usuario ya esta registrado ene sta compañía", HttpStatus.BAD_REQUEST);
    const newUserCompany = await this.userCompanyModel.create(createUserCompanyDto);
    if (!newUserCompany) throw new HttpErrorException("Error al crear el usuarios", HttpStatus.BAD_REQUEST);
    return newUserCompany;
  }

  async findAll() {
    return this.userCompanyModel.find();
  }

  async findByUserId(userId: string) {
    const foundUserCompany = await this.userCompanyModel.findOne({ user: userId });
    if (!foundUserCompany)
      throw new HttpErrorException("El usuario no esta registrado en ninguna compañía", HttpStatus.NOT_FOUND);
    return foundUserCompany;
  }

  async update(id: string, updateUserCompanyDto: UpdateUserCompanyDto) {
    const foundUserCompany = await this.userCompanyModel.findById(id);
    if (!foundUserCompany)
      throw new HttpErrorException("El usuario no esta registrado ene sta compañía", HttpStatus.NOT_FOUND);
    const updatedUserCompany = await this.userCompanyModel.findByIdAndUpdate(id, updateUserCompanyDto, {
      new: true
    });
    if (!updatedUserCompany)
      throw new HttpErrorException("Error al actualizar el usuario", HttpStatus.BAD_REQUEST);
    return updatedUserCompany;
  }
}

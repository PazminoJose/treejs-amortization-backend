import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserRolDto } from "./dto/create-user-rol.dto";
import { UserRol, UserRolDocument } from "./schemas/user-rol.schema";

@Injectable()
export class UserRolService {
  constructor(@InjectModel(UserRol.name) private userRolModel: Model<UserRolDocument>) {}
  async create(createUserRolDto: CreateUserRolDto) {
    const createdUserRol = await this.userRolModel.create(createUserRolDto);
    return createdUserRol;
  }

  async findOne(userId: string) {
    const foundUserRol = await this.userRolModel.find({ user: userId }).populate("rol");
    return foundUserRol;
  }
}

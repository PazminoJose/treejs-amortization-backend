import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";
import { HttpErrorException } from "@commons";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const foundUser = this.userModel.findOne({ email: createUserDto.email });
    if(foundUser) throw new HttpErrorException("Error al encontrar el usuario", HttpStatus.BAD_REQUEST);
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findByEmail(email: string) {
    const foundUser = (await this.userModel.findOne({ email: email })).populate("person");
    if (!foundUser) throw new HttpErrorException("Error al encontrar el usuario", HttpStatus.BAD_REQUEST)
    return foundUser;
  }

}

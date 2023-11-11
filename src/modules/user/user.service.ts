import { HttpErrorException } from "@commons";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { hash } from "bcrypt";
import mongoose, { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
  private readonly SALT_ROUNDS = 10;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const foundUser = await this.userModel.findOne({ email: createUserDto.email });
    if (foundUser) throw new HttpErrorException("El usuario ya existe", HttpStatus.BAD_REQUEST);
    const createdUser = await this.userModel.create(createUserDto);
    if (!createdUser) throw new HttpErrorException("Error al crear el usuario", HttpStatus.BAD_REQUEST);
    return createdUser;
  }

  async createWithSession(createUserDto: CreateUserDto, session: mongoose.mongo.ClientSession) {
    const foundUser = await this.userModel.findOne({ email: createUserDto.email });
    if (foundUser) throw new HttpErrorException("El usuario ya existe", HttpStatus.BAD_REQUEST);
    createUserDto.password = await hash(createUserDto.password, this.SALT_ROUNDS);
    const createdUser = await this.userModel.create([createUserDto], { session });
    if (createdUser.length === 0)
      throw new HttpErrorException("Error al crear el usuario", HttpStatus.BAD_REQUEST);
    return createdUser[0];
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findByEmail(email: string) {
    const foundUser = await this.userModel.findOne({ email: email }).populate("person");
    return foundUser;
  }
}

import { AppRoles, HttpErrorException } from "@commons";
import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectConnection } from "@nestjs/mongoose";
import { compare } from "bcrypt";
import mongoose from "mongoose";
import { PersonService } from "../person/person.service";
import { UserRolService } from "../user-rol/user-rol.service";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { LoginResponse, Payload } from "./interfaces";

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
    private readonly userService: UserService,
    private readonly userRolService: UserRolService,
    private readonly personService: PersonService,
    private readonly jwtService: JwtService
  ) {}
  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const foundUser = await this.userService.findByEmail(email);
    if (!foundUser) throw new HttpErrorException("Correo o contraseña incorrectos", HttpStatus.BAD_REQUEST);
    const isPasswordVerified = await compare(password, foundUser.password);
    if (!isPasswordVerified)
      throw new HttpErrorException("Correo o contraseña incorrectos", HttpStatus.BAD_REQUEST);
    const userRoles = await this.userRolService.findOne(foundUser._id.toString());
    const roles = userRoles.map((userRole) => ({
      _id: userRole.rol._id.toString() as string,
      name: userRole.rol.name as AppRoles
    }));
    const payload: Payload = {
      idUser: foundUser._id.toString(),
      idPerson: foundUser.person._id.toString(),
      roles,
      email: foundUser.email
    };
    const token = await this.jwtService.signAsync(payload);
    const user = {
      idUser: foundUser._id.toString(),
      idPerson: foundUser.person._id.toString(),
      names: foundUser.person.lastName + " " + foundUser.person.firstName,
      email: foundUser.email,
      roles
    };
    return { user, token };
  }

  async register(registerDto: RegisterDto) {
    const { person, user } = registerDto;
    const foundUser = this.userService.findByEmail(user.email);
    if (foundUser) throw new HttpErrorException("Usuario ya registrado", HttpStatus.BAD_REQUEST);
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();
    try {
      const newPerson = await this.personService.createWithSession(person, transactionSession);
      const personId = newPerson._id.toString();
      await this.userService.createWithSession({ ...user, person: personId }, transactionSession);
      await transactionSession.commitTransaction();
      await transactionSession.endSession();
    } catch (error) {
      await transactionSession.abortTransaction();
      await transactionSession.endSession();
      throw HttpErrorException.createFromError(error);
    }
  }
}

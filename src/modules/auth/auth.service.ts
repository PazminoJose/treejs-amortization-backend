import { HttpErrorException } from "@commons";
import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { LoginResponse, Payload } from "./interfaces";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const foundUser = await this.userService.findByEmail(email);
    if (!foundUser) throw new HttpErrorException("Correo o contraseña incorrectos", HttpStatus.BAD_REQUEST);
    const isPasswordVerified = await compare(password, foundUser.password);
    if (!isPasswordVerified)
      throw new HttpErrorException("Correo o contraseña incorrectos", HttpStatus.BAD_REQUEST);
    const payload: Payload = {
      idUser: foundUser._id.toString(),
      idPerson: foundUser.person._id.toString(),
      roles: [],
      email: foundUser.email
    };
    const token = await this.jwtService.signAsync(payload);
    const user = {
      idUser: foundUser._id.toString(),
      idPerson: foundUser.person._id.toString(),
      names: foundUser.person.lastName + " " + foundUser.person.firstName,
      email: foundUser.email,
      roles: []
    };
    const data: LoginResponse = { user, token };
    return data;
  }
}

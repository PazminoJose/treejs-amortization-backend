import { AppRoles, HttpErrorException } from "@commons";
import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectConnection } from "@nestjs/mongoose";
import { compare } from "bcrypt";
import mongoose from "mongoose";
import { CompanyService } from "../company/company.service";
import { PersonService } from "../person/person.service";
import { RolService } from "../rol/rol.service";
import { UserCompanyService } from "../user-company/user-company.service";
import { UserRolService } from "../user-rol/user-rol.service";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { LoginResponse, Payload } from "./interfaces";

@Injectable()
export class AuthService {
  private readonly DEFAULT_ROL = "USER";

  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
    private readonly userService: UserService,
    private readonly userRolService: UserRolService,
    private readonly personService: PersonService,
    private readonly rolService: RolService,
    private readonly jwtService: JwtService,
    private readonly companyService: CompanyService,
    private readonly userCompanyService: UserCompanyService
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const foundUser = await this.userService.findByEmail(email);
    if (!foundUser) throw new HttpErrorException("Correo o contraseña incorrectos", HttpStatus.BAD_REQUEST);
    const isPasswordVerified = await compare(password, foundUser.password);
    if (!isPasswordVerified)
      throw new HttpErrorException("Correo o contraseña incorrectos", HttpStatus.BAD_REQUEST);
    const userRoles = await this.userRolService.findByUserId(foundUser._id.toString());
    console.log({ userRoles });

    const roles = userRoles.map((userRole) => ({
      _id: userRole.rol._id.toString() as string,
      name: userRole.rol.name as AppRoles
    }));
    const userCompany = await this.userCompanyService.findByUserId(foundUser._id.toString());
    const payload: Payload = {
      userId: foundUser._id.toString(),
      personId: foundUser.person._id.toString(),
      roles,
      email: foundUser.email,
      company: userCompany.company
    };
    const token = await this.jwtService.signAsync(payload);
    const user = {
      userId: foundUser._id.toString(),
      personId: foundUser.person._id.toString(),
      names: foundUser.person.lastName + " " + foundUser.person.firstName,
      email: foundUser.email,
      company: userCompany.company,
      roles
    };
    return { user, token };
  }

  async register(registerDto: RegisterDto) {
    const { person, user, company } = registerDto;
    const foundUser = await this.userService.findByEmail(user.email);
    if (foundUser) throw new HttpErrorException("Usuario ya registrado", HttpStatus.BAD_REQUEST);
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();
    try {
      const newPerson = await this.personService.createWithSession(person, transactionSession);
      const personId = newPerson._id.toString();
      const newUser = await this.userService.createWithSession(
        { ...user, person: personId },
        transactionSession
      );
      const rol = await this.rolService.findByName(this.DEFAULT_ROL);
      await this.userRolService.createWithSession(
        { rol: rol._id.toString(), user: newUser._id.toString() },
        transactionSession
      );
      await this.userCompanyService.createWithSession(
        { company, user: newUser._id.toString() },
        transactionSession
      );
      await transactionSession.commitTransaction();
      await transactionSession.endSession();
    } catch (error) {
      await transactionSession.abortTransaction();
      await transactionSession.endSession();
      throw HttpErrorException.createFromError(error);
    }
  }
}

import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { HttpErrorException } from "src/commons/exceptions/http-error.exception";
import { CreatePersonDto } from "./dto/create-person.dto";
import { Person, PersonDocument } from "./schemas/person.schema";

@Injectable()
export class PersonService {
  constructor(@InjectModel(Person.name) private readonly personModel: Model<PersonDocument>) {}

  async create(createPersonDto: CreatePersonDto) {
    const foundPerson = await this.personModel.findOne({ dni: createPersonDto.dni });
    if (foundPerson) throw new HttpErrorException("Error al encontrar al usuario", HttpStatus.BAD_REQUEST);
    const createdPerson = await this.personModel.create(createPersonDto);
    return createdPerson;
  }

  async createWithSession(createPersonDto: CreatePersonDto, session: mongoose.mongo.ClientSession) {
    const foundPerson = await this.personModel.findOne({ dni: createPersonDto.dni });
    if (foundPerson) throw new HttpErrorException("Error al encontrar al usuario", HttpStatus.BAD_REQUEST);
    const createdPerson = await this.personModel.create([createPersonDto], { session });
    return createdPerson[0];
  }

  async findAll() {
    return await this.personModel.find();
  }
}

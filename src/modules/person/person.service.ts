import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person, PersonDocument } from './schemas/person.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";


@Injectable()
export class PersonService {
  constructor(@InjectModel(Person.name) private readonly personModel: Model<PersonDocument>) { }

  async create(createPersonDto: CreatePersonDto) {
    const foundPerson = await this.personModel.findOne({ dni: createPersonDto.dni});
    if (foundPerson) throw new Error(`Person ${createPersonDto.firstName} already exists`);
    const createdPerson = await this.personModel.create(createPersonDto);
    return createdPerson;
  }

  findAll() {
    return this.personModel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}

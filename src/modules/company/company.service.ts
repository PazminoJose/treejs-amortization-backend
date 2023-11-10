import { HttpErrorException } from "@commons";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./schemas/company.schema";

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private readonly companyModel: Model<Company>) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const newCompany = await this.companyModel.create(createCompanyDto);
    if (!newCompany) throw new HttpErrorException("Error al crear la compañía", HttpStatus.BAD_REQUEST);
    return newCompany;
  }

  async findAll() {
    return this.companyModel.find();
  }

  async findById(id: number) {
    return this.companyModel.findById(id);
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const foundCompany = await this.companyModel.findById(id);
    if (!foundCompany) throw new HttpErrorException("La compañía no existe", HttpStatus.NOT_FOUND);
    const updatedCompany = await this.companyModel.findByIdAndUpdate(id, updateCompanyDto, { new: true });
    if (!updatedCompany)
      throw new HttpErrorException("Error al actualizar la compañía", HttpStatus.BAD_REQUEST);
    return updatedCompany;
  }
}

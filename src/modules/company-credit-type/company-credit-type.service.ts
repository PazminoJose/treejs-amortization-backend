import { HttpErrorException } from "@commons";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCompanyCreditTypeDto } from "./dto/create-company-credit-type.dto";
import { UpdateCompanyCreditTypeDto } from "./dto/update-company-credit-type.dto";
import { CompanyCreditType, CompanyCreditTypeDocument } from "./schemas/company-credit-type";

@Injectable()
export class CompanyCreditTypeService {
  constructor(
    @InjectModel(CompanyCreditType.name) private companyCreditTypeModel: Model<CompanyCreditTypeDocument>
  ) {}
  async create(createCompanyCreditTypeDto: CreateCompanyCreditTypeDto) {
    const foundCompanyCreditType = await this.companyCreditTypeModel.findOne({
      company: createCompanyCreditTypeDto.company,
      creditType: createCompanyCreditTypeDto.creditType
    });
    if (foundCompanyCreditType)
      throw new HttpErrorException("Tipo de crédito ya registrado en la compañía", HttpStatus.BAD_REQUEST);
    const newCompanyCreditType = await this.companyCreditTypeModel.create(createCompanyCreditTypeDto);
    if (!newCompanyCreditType)
      throw new HttpErrorException(
        "Error al crear el tipo de crédito en la compañía",
        HttpStatus.BAD_REQUEST
      );
    return newCompanyCreditType;
  }

  async findAll() {
    return this.companyCreditTypeModel.find();
  }

  async findByCompanyId(companyId: string) {
    const foundCompanyCreditType = await this.companyCreditTypeModel.findOne({ company: companyId });
    if (!foundCompanyCreditType)
      throw new HttpErrorException("No se encontraron tipos de crédito en la compañía", HttpStatus.NOT_FOUND);
    return foundCompanyCreditType;
  }

  async update(id: string, updateCompanyCreditTypeDto: UpdateCompanyCreditTypeDto) {
    const foundCompanyCreditType = await this.companyCreditTypeModel.findById(id);
    if (!foundCompanyCreditType)
      throw new HttpErrorException("Tipo de crédito no registrado en la compañía", HttpStatus.NOT_FOUND);
    const updatedCompanyType = await this.companyCreditTypeModel.findByIdAndUpdate(
      id,
      updateCompanyCreditTypeDto,
      { new: true }
    );
    if (!updatedCompanyType)
      throw new HttpErrorException(
        "Error al actualizar el tipo de crédito en la compañía",
        HttpStatus.BAD_REQUEST
      );
    return updatedCompanyType;
  }
}

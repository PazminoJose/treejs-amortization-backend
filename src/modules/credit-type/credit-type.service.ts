import { HttpErrorException } from "@commons";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCreditTypeDto } from "./dto/create-credit-type.dto";
import { UpdateCreditTypeDto } from "./dto/update-credit-type.dto";
import { CreditType, CreditTypeDocument } from "./schemas/credit-type.schema";

@Injectable()
export class CreditTypeService {
  constructor(@InjectModel(CreditType.name) private creditTypeModel: Model<CreditTypeDocument>) {}

  async create(createCreditTypeDto: CreateCreditTypeDto) {
    const foundCreditType = await this.creditTypeModel.findOne({
      name: createCreditTypeDto.name.toUpperCase()
    });
    if (foundCreditType) throw new HttpErrorException("El tipo de crédito ya existe", HttpStatus.BAD_REQUEST);
    const newCreditType = await this.creditTypeModel.create(createCreditTypeDto);
    if (!newCreditType)
      throw new HttpErrorException("Error al crear el tipo de crédito", HttpStatus.BAD_REQUEST);
    return newCreditType;
  }

  async findAll() {
    return this.creditTypeModel.aggregate([{ $project: { label: "$name", value: "$_id" } }]);
  }

  async findById(id: string) {
    const foundCreditType = await this.creditTypeModel.findById(id);
    if (!foundCreditType) throw new HttpErrorException("El tipo de crédito no existe", HttpStatus.NOT_FOUND);
    return foundCreditType;
  }

  async update(id: string, updateCreditTypeDto: UpdateCreditTypeDto) {
    const foundCreditType = await this.creditTypeModel.findById(id);
    if (!foundCreditType) throw new HttpErrorException("El tipo de crédito no existe", HttpStatus.NOT_FOUND);
    const updatedCreditType = await this.creditTypeModel.findByIdAndUpdate(id, updateCreditTypeDto, {
      new: true
    });
    if (!updatedCreditType)
      throw new HttpErrorException("Error al actualizar el tipo de crédito", HttpStatus.BAD_REQUEST);
    return updatedCreditType;
  }
}

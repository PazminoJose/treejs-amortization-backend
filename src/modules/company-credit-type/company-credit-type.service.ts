import { HttpErrorException } from "@commons";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, PipelineStage } from "mongoose";
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

  async findByCompanyId() {
    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: "credittypes",
          localField: "creditType",
          foreignField: "_id",
          as: "creditType"
        }
      },
      {
        $unwind: "$creditType"
      },
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "company"
        }
      },
      {
        $unwind: "$company"
      },
      {
        $group: {
          _id: "$company",
          creditTypes: {
            $push: "$creditType.name"
          }
        }
      }
    ];
    const foundCompanyCreditType = await this.companyCreditTypeModel.aggregate(pipeline);
    if (foundCompanyCreditType.length === 0)
      throw new HttpErrorException("No se encontraron tipos de crédito en la compañía", HttpStatus.NOT_FOUND);
    const result = foundCompanyCreditType.map(({ _id, creditTypes }) => ({
      name: _id.name,
      ruc: _id.ruc,
      creditTypes
    }));
    return result;
  }

  async findByCompanyIdCombo(companyId: string) {
    const pipeline: PipelineStage[] = [
      {
        $match: { company: new mongoose.Types.ObjectId(companyId) }
      },
      {
        $lookup: {
          from: "credittypes",
          localField: "creditType",
          foreignField: "_id",
          as: "creditType"
        }
      },
      {
        $unwind: "$creditType"
      },
      {
        $group: {
          _id: "$company",
          creditTypes: {
            $push: { label: "$creditType.name", value: "$creditType._id" }
          }
        }
      },
      {
        $project: {
          _id: 0
        }
      }
    ];
    const foundCompanyCreditType = await this.companyCreditTypeModel.aggregate(pipeline);
    if (foundCompanyCreditType.length === 0)
      throw new HttpErrorException("No se encontraron tipos de crédito en la compañía", HttpStatus.NOT_FOUND);
    return foundCompanyCreditType[0].creditTypes;
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

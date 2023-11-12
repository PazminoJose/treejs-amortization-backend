import { HttpErrorException } from "@commons";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, PipelineStage } from "mongoose";
import { CreditTypeService } from "../credit-type/credit-type.service";
import { CreateCreditTypeIndirectPaymentDto } from "./dto/create-credit-type-indirect-payment.dto";
import {
  CreditTypeIndirectPayment,
  CreditTypeIndirectPaymentDocument
} from "./schemas/credit-type-indirect-payment.schema";

@Injectable()
export class CreditTypeIndirectPaymentService {
  constructor(
    @InjectModel(CreditTypeIndirectPayment.name)
    private readonly creditTypeIndirectPaymentModel: Model<CreditTypeIndirectPaymentDocument>,
    private readonly creditTypeService: CreditTypeService
  ) {}

  async create(createCreditTypeIndirectPaymentDto: CreateCreditTypeIndirectPaymentDto) {
    const foundCreditTypeIndirectPayment = await this.creditTypeIndirectPaymentModel.findOne({
      creditType: createCreditTypeIndirectPaymentDto.creditType,
      indirectPayment: createCreditTypeIndirectPaymentDto.indirectPayment
    });
    if (foundCreditTypeIndirectPayment)
      throw new HttpErrorException("El pago indirecto ya existe", HttpStatus.BAD_REQUEST);

    const createdCreditTypeIndirectPayment = await this.creditTypeIndirectPaymentModel.create(
      createCreditTypeIndirectPaymentDto
    );
    if (!createdCreditTypeIndirectPayment)
      throw new HttpErrorException(
        "No se pudo agregar el pago indirecto a este crédito",
        HttpStatus.BAD_REQUEST
      );
    return createdCreditTypeIndirectPayment;
  }

  async findAll() {
    return this.creditTypeIndirectPaymentModel.find();
  }

  async findAllWithIndirectPayment() {
    return (this.creditTypeIndirectPaymentModel.find().populate("indirectPayment").populate("creditType"));
  }
  async findByCreditTypeId(creditTypeId: string) {
    const pipeline: PipelineStage[] = [
      {
        $match: { creditType: new mongoose.Types.ObjectId(creditTypeId) }
      },
      {
        $lookup: {
          from: "indirectpayments",
          localField: "indirectPayment",
          foreignField: "_id",
          as: "indirectPayment"
        }
      },
      {
        $unwind: "$indirectPayment"
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
          _id: "$creditType._id",
          creditType: { $first: "$creditType" },
          indirectPayments: { $push: "$indirectPayment" }
        }
      },
      {
        $project: {
          _id: 0,
          creditType: 1,
          indirectPayments: 1
        }
      }
    ];
    const creditTypeIndirectPayments = await this.creditTypeIndirectPaymentModel.aggregate(pipeline);
    if (creditTypeIndirectPayments.length === 0) {
      const creditType = await this.creditTypeService.findById(creditTypeId);
      return { creditType };
    }
    return creditTypeIndirectPayments[0];
  }
}

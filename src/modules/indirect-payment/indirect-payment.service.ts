import { HttpErrorException } from "@commons";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateIndirectPaymentDto } from "./dto/create-indirect-payment.dto";
import { IndirectPayment, IndirectPaymentDocument } from "./schemas/indirect-payment.schema";

@Injectable()
export class IndirectPaymentService {
  constructor(
    @InjectModel(IndirectPayment.name) private readonly indirectPaymentModel: Model<IndirectPaymentDocument>
  ) {}

  async create(createIndirectPaymentDto: CreateIndirectPaymentDto) {
    const foundIndirectPayment = await this.indirectPaymentModel.findOne({
      name: createIndirectPaymentDto.name
    });
    if (foundIndirectPayment)
      throw new HttpErrorException("El pago indirecto ya existe", HttpStatus.BAD_REQUEST);

    const createdIndirectPayment = await this.indirectPaymentModel.create(createIndirectPaymentDto);
    if (!createdIndirectPayment)
      throw new HttpErrorException("No se pudo crear el pago indirecto", HttpStatus.BAD_REQUEST);
    return createdIndirectPayment;
  }

  async findAll() {
    return this.indirectPaymentModel.aggregate([{ $project: { label: "$name", value: "$_id" } }]);
  }
}

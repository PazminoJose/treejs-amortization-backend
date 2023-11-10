import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Company } from "src/modules/company/schemas/company.schema";
import { CreditType } from "src/modules/credit-type/schemas/credit-type.schema";

export type CompanyCreditTypeDocument = HydratedDocument<CompanyCreditType>;

@Schema({ versionKey: false })
export class CompanyCreditType {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name, required: true })
  company: Company;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CreditType.name, required: true })
  creditType: CreditType;
}

export const CompanyCreditTypeSchema = SchemaFactory.createForClass(CompanyCreditType);

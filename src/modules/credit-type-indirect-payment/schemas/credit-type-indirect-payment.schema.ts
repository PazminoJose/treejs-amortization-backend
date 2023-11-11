import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { CreditType } from "src/modules/credit-type/schemas/credit-type.schema";
import { IndirectPayment } from "src/modules/indirect-payment/schemas/indirect-payment.schema";

export type CreditTypeIndirectPaymentDocument = HydratedDocument<CreditTypeIndirectPayment>;

@Schema({ versionKey: false })
export class CreditTypeIndirectPayment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CreditType.name, required: true })
  creditType: CreditType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: IndirectPayment.name, required: true })
  indirectPayment: IndirectPayment;
}

export const CreditTypeIndirectPaymentSchema = SchemaFactory.createForClass(CreditTypeIndirectPayment);

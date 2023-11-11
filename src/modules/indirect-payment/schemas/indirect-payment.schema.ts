import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type IndirectPaymentDocument = HydratedDocument<IndirectPayment> & IndirectPayment;

@Schema({ versionKey: false })
export class IndirectPayment {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  mount: number;
}

export const IndirectPaymentSchema = SchemaFactory.createForClass(IndirectPayment);

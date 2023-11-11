import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CreditTypeDocument = HydratedDocument<CreditType>;

@Schema({ versionKey: false })
export class CreditType {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  interestRate: number;

  @Prop({ required: true })
  maxTime: number;

  @Prop({ required: true })
  minTime: number;
}

export const CreditTypeSchema = SchemaFactory.createForClass(CreditType);

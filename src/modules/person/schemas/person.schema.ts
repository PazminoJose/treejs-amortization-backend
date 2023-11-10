import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PersonDocument = HydratedDocument<Person>;

@Schema({ versionKey: false })
export class Person {
  @Prop({ required: true })
  dni: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

}

export const PersonSchema = SchemaFactory.createForClass(Person);

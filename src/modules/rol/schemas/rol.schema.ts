import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
export type RolDocument = HydratedDocument<Rol>;

@Schema({ versionKey: false, timestamps: true })
export class Rol extends Document {
  @Prop({ required: true, unique: true })
  name: string;

}

export const RolSchema = SchemaFactory.createForClass(Rol);

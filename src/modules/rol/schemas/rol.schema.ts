import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
export type RolDocument = HydratedDocument<Rol>;

@Schema({ versionKey: false, timestamps: true })
export class Rol {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;
}

export const RolSchema = SchemaFactory.createForClass(Rol);

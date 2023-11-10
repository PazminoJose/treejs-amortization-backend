import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, HydratedDocument } from "mongoose";
import { Rol } from "../../rol/schemas/rol.schema";
import { User } from "src/modules/user/schemas/user.schema";

export type UserRolDocument = HydratedDocument<UserRol>;

@Schema({ versionKey: false})
export class UserRol extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Rol", required: true })
  rol: Rol;
}

export const UserRolSchema = SchemaFactory.createForClass(UserRol);

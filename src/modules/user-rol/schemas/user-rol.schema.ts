import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/modules/user/schemas/user.schema";
import { Rol } from "../../rol/schemas/rol.schema";

export type UserRolDocument = HydratedDocument<UserRol>;

@Schema({ versionKey: false })
export class UserRol {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Rol.name, required: true })
  rol: Rol;
}

export const UserRolSchema = SchemaFactory.createForClass(UserRol);

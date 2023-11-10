import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Person } from "src/modules/person/schemas/person.schema";

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Person.name, required: true })
  person: Person;
}

export const UserSchema = SchemaFactory.createForClass(User);

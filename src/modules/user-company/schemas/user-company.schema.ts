import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Company } from "src/modules/company/schemas/company.schema";
import { User } from "src/modules/user/schemas/user.schema";

export type UserCompanyDocument = HydratedDocument<UserCompany>;

@Schema({ versionKey: false })
export class UserCompany {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name, required: true })
  company: Company;
}

export const UserCompanySchema = SchemaFactory.createForClass(UserCompany);

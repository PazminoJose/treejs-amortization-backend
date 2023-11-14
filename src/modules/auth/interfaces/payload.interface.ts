import { Company } from "src/modules/company/schemas/company.schema";
import { Roles } from "./login-response";

export interface Payload {
  userId: string;
  personId: string;
  email: string;
  roles: Roles[];
  company: Company;
}

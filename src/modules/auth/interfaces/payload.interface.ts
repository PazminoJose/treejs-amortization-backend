import { Roles } from "./login-response";

export interface Payload {
  userId: string;
  personId: string;
  email: string;
  roles: Roles[];
}

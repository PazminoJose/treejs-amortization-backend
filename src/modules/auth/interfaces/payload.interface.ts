import { Roles } from "./login-response";

export interface Payload {
  idUser: string;
  idPerson: string;
  email: string;
  roles: Roles[];
}

import { AppRoles } from '@commons';

export type Roles = {
  _id: string;
  name: AppRoles;
};

export interface LoginResponse {
  idUser: string;
  names: string;
  email: string;
  roles: Roles[];
}

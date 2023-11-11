import { AppRoles } from "@commons";

export type Roles = {
  _id: string;
  name: AppRoles;
};

export interface LoginResponse {
  user: {
    userId: string;
    personId: string;
    names: string;
    email: string;
    roles: Roles[];
  };
  token: string;
}

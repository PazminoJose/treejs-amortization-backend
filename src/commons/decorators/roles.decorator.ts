import { SetMetadata } from "@nestjs/common";
import { AppRoles } from "../types";
export const ROLES_KEY = "roles";
export const Roles = (...roles: AppRoles[]) => SetMetadata(ROLES_KEY, roles);

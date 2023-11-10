import { SetMetadata } from "@nestjs/common";

export const IS_SUPER_ADMIN_ONLY_KEY = "superAdminOnly";
export const SuperAdminOnly = () => SetMetadata(IS_SUPER_ADMIN_ONLY_KEY, true);

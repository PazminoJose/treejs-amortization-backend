import { SetMetadata } from "@nestjs/common";

export const IS_ADMIN_ONLY_KEY = "adminOnly";
export const AdminOnly = () => SetMetadata(IS_ADMIN_ONLY_KEY, true);

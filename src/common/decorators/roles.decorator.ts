import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/utils/enums";

export const ROLES_KEY = "roles";
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const Student = () => Roles(UserRole.STUDENT);
export const Manager = () => Roles(UserRole.MANAGER);
export const Admin = () => Roles(UserRole.ADMIN);

import { SetMetadata } from '@nestjs/common';
import { Role } from '@domain/entities/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
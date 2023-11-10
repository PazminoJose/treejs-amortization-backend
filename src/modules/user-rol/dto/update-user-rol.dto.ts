import { PartialType } from '@nestjs/swagger';
import { CreateUserRolDto } from './create-user-rol.dto';

export class UpdateUserRolDto extends PartialType(CreateUserRolDto) {}

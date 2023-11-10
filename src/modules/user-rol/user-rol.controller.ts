import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRolService } from './user-rol.service';
import { CreateUserRolDto } from './dto/create-user-rol.dto';
import { UpdateUserRolDto } from './dto/update-user-rol.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('user-rol')
@Controller('user-rol')
export class UserRolController {
  constructor(private readonly userRolService: UserRolService) {}

  @Post()
  create(@Body() createUserRolDto: CreateUserRolDto) {
    return this.userRolService.create(createUserRolDto);
  }

  @Get(':id')
  findOne(@Param('id') userId: string) {
    return this.userRolService.findOne(userId);
  }

}

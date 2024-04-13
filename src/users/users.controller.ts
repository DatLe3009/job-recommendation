import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/auth/decorator';
import { UserRole } from 'src/shared/enums';
import { PayloadType } from 'src/auth/types';
import { DeleteResult } from 'typeorm';
import { User } from './entities';
import { ApiResponse } from 'src/shared/interfaces';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@GetUser('userId') id: number): Promise<ApiResponse<User>> {
      const data = await this.usersService.findById(id);
      return {
        message: 'get my profile successful',
        statusCode: 200,
        data: data
      }
  }

  @Patch('me')
  async editMe(
    @GetUser('userId') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ApiResponse<User>> {
    const data = await this.usersService.update(id, updateUserDto);
    return {
      message: 'Update my profile successful',
      statusCode: 200,
      data: data
    }
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<User>> {
    const data = await this.usersService.create(createUserDto);
    return {
      message: 'User created',
      statusCode: 201,
      data: data
    }
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ApiResponse<User>> {
    const data = await this.usersService.update(+id, updateUserDto);
    return {
      message: 'Update user successful',
      statusCode: 200,
      data: data
    }
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.remove(+id);
  }
}

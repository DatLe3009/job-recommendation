import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserQueryDto } from './dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/auth/decorator';
import { UserRole } from 'src/shared/enums';
import { PayloadType } from 'src/auth/types';
import { DeleteResult } from 'typeorm';
import { User } from './entities';
import { ApiResponse } from 'src/shared/interfaces';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

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
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
    @Query()
    query: UserQueryDto
  ): Promise<ApiResponse<Pagination<User>>> {
    const options: IPaginationOptions = {
      page,
      limit: limit > 100 ? 100 : limit,
    };    
    const data = await this.usersService.findAll(options, query);
    return {
      message: 'find all users successfully',
      statusCode: 200,
      data: data
    }
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

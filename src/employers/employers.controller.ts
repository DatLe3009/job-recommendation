import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto, EmployerQueryDto, UpdateEmployerDto } from './dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/auth/decorator';
import { UserRole } from 'src/shared/enums';
import { ApiResponse } from 'src/shared/interfaces';
import { Employer } from './entities';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Employers')
@Controller('employers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
    @Query()
    query: EmployerQueryDto
  ): Promise<ApiResponse<Pagination<Employer>>> {
    const options: IPaginationOptions = {
      page,
      limit: limit > 100 ? 100 : limit,
    };    
    const data = await this.employersService.findAll(options, query);
    return {
      message: 'find all companies successfully',
      statusCode: 200,
      data: data
    }
  }

  @Get('me')
  @Roles(UserRole.EMPLOYER)
  async getMe(
    @GetUser('userId') id: number
  ): Promise<ApiResponse<Employer>> {
    const data = await this.employersService.findOne(id);
    return {
      message: 'get company successfully',
      statusCode: 200,
      data: data
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ApiResponse<Employer>> {
    const data = await this.employersService.findOne(id);
    return {
      message: 'get company successfully',
      statusCode: 200,
      data: data
    }
  }

  @Patch('me')
  @Roles(UserRole.EMPLOYER)
  async update(
    @GetUser('userId') id: number, 
    @Body() updateEmployerDto: UpdateEmployerDto
  ): Promise<ApiResponse<Employer>> {
    const data = await this.employersService.update(id, updateEmployerDto);
    return {
      message: 'Company updated successfully',
      statusCode: 200,
      data: data
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employersService.remove(+id);
  }
}

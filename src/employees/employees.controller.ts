import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { UpdateEmployeeDto } from './dto';
import { GetUser, Roles } from 'src/auth/decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guard';
import { UserRole } from 'src/shared/enums';
import { ApiResponse } from 'src/shared/interfaces';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Employees')
@Controller('employees')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get('me')
  @Roles(UserRole.EMPLOYEE)
  async getProfile(
    @GetUser('userId') id: number
  ): Promise<ApiResponse<any>> {
    const data = await this.employeesService.getProfile(id);
    return {
      message: 'get your profile successfully',
      statusCode: 200,
      data: data
    }
  }

  @Patch('me')
  @Roles(UserRole.EMPLOYEE)
  async update(
    @GetUser('userId') id: number, 
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ): Promise<ApiResponse<any>> {
    const data = await this.employeesService.update(id, updateEmployeeDto);
    return {
      message: 'update employee successfull',
      statusCode: 200,
      data: data
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}

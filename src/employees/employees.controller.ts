import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { UpdateEmployeeDto } from './dto';
import { GetUser, Roles } from 'src/auth/decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guard';
import { UserRole } from 'src/shared/enums';
import { ApiResponse } from 'src/shared/interfaces';


@Controller('employees')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
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

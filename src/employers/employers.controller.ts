import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto, UpdateEmployerDto } from './dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/auth/decorator';
import { UserRole } from 'src/shared/enums';
import { ApiResponse } from 'src/shared/interfaces';
import { Employer } from './entities';

@Controller('employers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Get()
  findAll() {
    return this.employersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employersService.findOne(+id);
  }

  @Patch('me')
  @Roles(UserRole.EMPLOYER)
  async update(
    @GetUser('userId') id: number, 
    @Body() updateEmployerDto: UpdateEmployerDto
  ): Promise<ApiResponse<Employer>> {
    const data = await this.employersService.update(id, updateEmployerDto);
    return {
      message: 'Update infomation of the company successful',
      statusCode: 200,
      data: data
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employersService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OnlineProfilesService } from './online_profiles.service';
import { CreateOnlineProfileDto, UpdateOnlineProfileDto } from './dto';
import { ApiResponse } from 'src/shared/interfaces';
import { OnlineProfile } from './entities';
import { GetUser, Roles } from 'src/auth/decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guard';
import { UserRole } from 'src/shared/enums';

@Controller('online-profiles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OnlineProfilesController {
  constructor(private readonly onlineProfilesService: OnlineProfilesService) {}

  @Post()
  @Roles(UserRole.EMPLOYEE)
  async create(
    @GetUser('userId') id: number,
    @Body() createOnlineProfileDto: CreateOnlineProfileDto
  ): Promise<ApiResponse<OnlineProfile>> {
    const data = await this.onlineProfilesService.create(id, createOnlineProfileDto);
    return {
      message: 'Online profile created successfully',
      statusCode: 201,
      data: data
    }
  }

  @Get()
  findAll() {
    return this.onlineProfilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onlineProfilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOnlineProfileDto: UpdateOnlineProfileDto) {
    return this.onlineProfilesService.update(+id, updateOnlineProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onlineProfilesService.remove(+id);
  }
}

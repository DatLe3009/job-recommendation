import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JobPostingsService } from './job_postings.service';
import { CreateJobPostingDto, UpdateJobPostingDto } from './dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guard';
import { UserRole } from 'src/shared/enums';
import { GetUser, Roles } from 'src/auth/decorator';
import { JobPosting } from './entities';
import { ApiResponse } from 'src/shared/interfaces';

@Controller('job-postings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JobPostingsController {
  constructor(private readonly jobPostingsService: JobPostingsService) {}

  @Post()
  @Roles(UserRole.EMPLOYER)
  async create(
    @GetUser('userId') employerId: number,
    @Body() createJobPostingDto: CreateJobPostingDto
  ): Promise<ApiResponse<JobPosting>> {
    const data = await this.jobPostingsService.create(employerId, createJobPostingDto);
    return {
      message: 'Job posting created successfully',
      statusCode: 201,
      data: data
    }
  }

  @Get()
  findAll() {
    return this.jobPostingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobPostingsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.EMPLOYER)
  async update(
    @GetUser('userId') employerId: number,
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateJobPostingDto: UpdateJobPostingDto
  ): Promise<ApiResponse<JobPosting>> {
    const data = await this.jobPostingsService.update(employerId ,id, updateJobPostingDto);
    return {
      message: `Job posting id ${id} updated successfully`,
      statusCode: 200,
      data: data
    }
  }

  @Delete(':id')
  @Roles(UserRole.EMPLOYER)
  async remove(
    @GetUser('userId') employerId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<JobPosting>> {
    const data = await this.jobPostingsService.remove(employerId, id);
    return {
      message: `Job posting id ${id} deleted successfully`,
      statusCode: 200,
      data: data
    }
  }
}

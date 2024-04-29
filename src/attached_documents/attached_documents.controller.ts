import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AttachedDocumentsService } from './attached_documents.service';
import { CreateAttachedDocumentDto, UpdateAttachedDocumentDto } from './dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guard';
import { UserRole } from 'src/shared/enums';
import { GetUser, Roles } from 'src/auth/decorator';
import { ApiResponse } from 'src/shared/interfaces';
import { AttachedDocument } from './entities';
import { DeleteResult } from 'typeorm';

@Controller('attached-documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttachedDocumentsController {
  constructor(private readonly attachedDocumentsService: AttachedDocumentsService) {}

  @Post()
  @Roles(UserRole.EMPLOYEE)
    async create(
      @GetUser('userId') id: number,
      @Body() createAttachedDocumentDto: CreateAttachedDocumentDto
    ): Promise<ApiResponse<AttachedDocument>> {
      const data = await this.attachedDocumentsService.create(id, createAttachedDocumentDto);
      return {
        message: 'attached Document created successfully',
        statusCode: 201,
        data: data
      }
    }
  
  @Get()
  findAll() {
    return this.attachedDocumentsService.findAll();
  }
  
  @Get('me')
  @Roles(UserRole.EMPLOYEE)
  async findOne(
    @GetUser('userId') id: number
  ): Promise<ApiResponse<AttachedDocument>> {
    const data = await this.attachedDocumentsService.findOne(id);
    return {
      message: 'Attached Document found',
      statusCode: 200,
      data: data
    }
  }
  
  @Patch('me')
  async update(
    @GetUser('userId') id: number, 
    @Body() updateAttachedDocumentDto: UpdateAttachedDocumentDto
  ): Promise<ApiResponse<AttachedDocument>> {
    const data = await this.attachedDocumentsService.update(id, updateAttachedDocumentDto);
    return {
      message: 'Updated attached Document successfully',
      statusCode: 200,
      data: data
    }
  }
  
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<DeleteResult>> {
    const data = await this.attachedDocumentsService.remove(id);
    return {
      message: `Removed attached Document has id ${id} successfully`,
      statusCode: 200,
      data: data 
    }
  }
}


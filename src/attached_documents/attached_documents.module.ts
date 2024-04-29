import { Module } from '@nestjs/common';
import { AttachedDocumentsService } from './attached_documents.service';
import { AttachedDocumentsController } from './attached_documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachedDocument } from './entities';

@Module({
  imports : [
    TypeOrmModule.forFeature([AttachedDocument]),
  ],
  controllers: [AttachedDocumentsController],
  providers: [AttachedDocumentsService],
})
export class AttachedDocumentsModule {}

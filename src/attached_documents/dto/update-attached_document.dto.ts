import { PartialType } from '@nestjs/mapped-types';
import { CreateAttachedDocumentDto } from './create-attached_document.dto';

export class UpdateAttachedDocumentDto extends PartialType(CreateAttachedDocumentDto) {}

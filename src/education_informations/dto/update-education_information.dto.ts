import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationInformationDto } from './create-education_information.dto';

export class UpdateEducationInformationDto extends PartialType(CreateEducationInformationDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateAnotherDegreeDto } from './create-another_degree.dto';

export class UpdateAnotherDegreeDto extends PartialType(CreateAnotherDegreeDto) {}

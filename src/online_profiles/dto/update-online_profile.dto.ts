import { PartialType } from '@nestjs/mapped-types';
import { CreateOnlineProfileDto } from './create-online_profile.dto';

export class UpdateOnlineProfileDto extends PartialType(CreateOnlineProfileDto) {}

import { IsDateString, IsEnum, IsMobilePhone, IsOptional, IsString } from "class-validator";
import { Sex } from 'src/shared/enums';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string;
    
    @IsDateString()
    @IsOptional()
    dob?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsMobilePhone()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    avatar?: string;
  
    @IsEnum(Sex)
    @IsOptional()
    sex?: Sex;
}


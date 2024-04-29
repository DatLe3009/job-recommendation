import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMobilePhone, IsOptional, IsString } from "class-validator";
import { Sex } from 'src/shared/enums';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    name?: string
    
    @IsDateString()
    @IsOptional()
    @ApiPropertyOptional()
    dob?: Date

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    address?: string

    @IsMobilePhone()
    @IsOptional()
    @ApiPropertyOptional()
    phone?: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    avatar?: string
  
    @IsEnum(Sex)
    @IsOptional()
    @ApiPropertyOptional()
    sex?: Sex
}


import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMobilePhone, IsOptional, IsString } from "class-validator";
import { Sex, UserRole } from 'src/shared/enums';

export class UserQueryDto {
    @IsEnum(UserRole)
    @IsOptional()
    @ApiPropertyOptional()
    role?: UserRole;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    name?: string;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    address?: string;

    @IsEnum(Sex)
    @IsOptional()
    @ApiPropertyOptional()
    sex?: Sex;
}


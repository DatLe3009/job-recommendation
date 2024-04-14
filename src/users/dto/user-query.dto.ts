import { IsDateString, IsEnum, IsMobilePhone, IsOptional, IsString } from "class-validator";
import { Sex, UserRole } from 'src/shared/enums';

export class UserQueryDto {
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsString()
    @IsOptional()
    name?: string;
    
    @IsString()
    @IsOptional()
    address?: string;

    @IsEnum(Sex)
    @IsOptional()
    sex?: Sex;
}


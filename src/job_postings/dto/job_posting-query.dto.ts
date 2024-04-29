import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator"
import { ApprovalStatus, Degree, EmploymentType, Experience, PositionLevel, Profession, Sex } from "src/shared/enums"

export class JobPostingQueryDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    workAddress?: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    jobTitle?: string

    @IsEnum(Profession)
    @IsOptional()
    @ApiPropertyOptional()
    profession?: Profession

    @IsEnum(EmploymentType)
    @IsOptional()
    @ApiPropertyOptional()
    employmentType?: EmploymentType

    @IsEnum(Degree)
    @IsOptional()
    @ApiPropertyOptional()
    degree?: Degree

    @IsEnum(Experience)
    @IsOptional()
    @ApiPropertyOptional()
    experience?: Experience

    @IsEnum(PositionLevel)
    @IsOptional()
    @ApiPropertyOptional()
    positionLevel?: PositionLevel

    @IsEnum(Sex)
    @IsOptional()
    @ApiPropertyOptional()
    sex?: Sex

    @IsNumberString()
    @IsOptional()
    @ApiPropertyOptional()
    employerId?: number

    @IsEnum(ApprovalStatus)
    @IsOptional()
    @ApiPropertyOptional()
    status?: ApprovalStatus
}


import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator"
import { ApprovalStatus, Degree, EmploymentType, Experience, PositionLevel, Profession, Sex } from "src/shared/enums"

export class JobPostingQueryDto {
    @IsString()
    @IsOptional()
    workAddress?: string

    @IsString()
    @IsOptional()
    jobTitle?: string

    @IsEnum(Profession)
    @IsOptional()
    profession?: Profession

    @IsEnum(EmploymentType)
    @IsOptional()
    employmentType?: EmploymentType

    @IsEnum(Degree)
    @IsOptional()
    degree?: Degree

    @IsEnum(Experience)
    @IsOptional()
    experience?: Experience

    @IsEnum(PositionLevel)
    @IsOptional()
    positionLevel?: PositionLevel

    @IsEnum(Sex)
    @IsOptional()
    sex?: Sex

    @IsNumberString()
    @IsOptional()
    employerId?: number

    @IsEnum(ApprovalStatus)
    @IsOptional()
    status?: ApprovalStatus
}


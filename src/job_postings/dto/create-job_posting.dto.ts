import { Transform } from "class-transformer"
import { IsBoolean, IsDate, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, MinDate } from "class-validator"
import { Degree, EmploymentType, Experience, PositionLevel, Profession, Sex } from "src/shared/enums"

export class CreateJobPostingDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsMobilePhone()
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    contactAddress: string

    @IsString()
    @IsNotEmpty()
    workAddress: string

    @IsString()
    @IsNotEmpty()
    jobTitle: string

    @IsEnum(Profession, { each: true })
    @IsNotEmpty()
    profession: Profession[];

    @IsEnum(EmploymentType)
    @IsNotEmpty()
    employmentType: EmploymentType

    @IsEnum(Degree)
    @IsNotEmpty()
    degree: Degree

    @IsEnum(Experience)
    @IsNotEmpty()
    experience: Experience

    @IsEnum(PositionLevel)
    @IsNotEmpty()
    positionLevel: PositionLevel

    @IsNumber()
    @IsOptional()
    minAge?: number

    @IsNumber()
    @IsOptional()
    maxAge?: number

    @IsEnum(Sex)
    @IsOptional()
    sex?: Sex | null

    @IsNumber()
    @IsNotEmpty()
    numberOfVacancies: number

    @IsNumber()
    @IsOptional()
    trialPeriod?: number

    @IsDate()
    @IsNotEmpty()
    @Transform( ({ value }) => value && new Date(value))
    @MinDate(new Date())
    applicationDeadline: Date

    @IsNumber()
    @IsOptional()
    minSalary?: number

    @IsNumber()
    @IsOptional()
    maxSalary?: number

    @IsString()
    @IsOptional()
    skills?: string

    @IsString()
    @IsNotEmpty()
    jobDescription: string

    @IsString()
    @IsNotEmpty()
    jobRequirements: string

    @IsString()
    @IsNotEmpty()
    benefits: string

    @IsBoolean()
    @IsOptional()   
    isHidden?: boolean
}


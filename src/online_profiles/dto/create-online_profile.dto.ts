import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Degree, EmploymentType, Experience, PositionLevel, Profession } from "src/shared/enums";

export class CreateOnlineProfileDto {
    @IsString()
    @IsNotEmpty()
    jobTitle: string;

    @IsEnum(Profession, { each: true })
    @IsNotEmpty()
    profession: Profession[];

    @IsEnum(PositionLevel)
    @IsNotEmpty()
    currentPosition: PositionLevel;

    @IsEnum(PositionLevel)
    @IsNotEmpty()
    desiredPosition: PositionLevel;

    @IsNumber()
    @IsNotEmpty()
    desiredSalary: number

    @IsEnum(Degree)
    @IsNotEmpty()
    degree: Degree

    @IsString()
    @IsNotEmpty()
    workAddress: string

    @IsEnum(Experience)
    @IsNotEmpty()
    experience: Experience

    @IsEnum(EmploymentType)
    @IsNotEmpty()
    employmentType: EmploymentType

    @IsString()
    @IsOptional()
    careerGoal?: string

    @IsString()
    @IsOptional()
    skills?: string
   
    @IsBoolean()
    @IsOptional()
    isHidden?: boolean
}

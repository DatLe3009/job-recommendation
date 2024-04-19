import { Transform } from "class-transformer"
import { Equals, IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxDate, ValidateIf } from "class-validator"

export class CreateWorkExperienceDto {
    @IsString()
    @IsNotEmpty()
    jobTitle: string

    @IsString()
    @IsNotEmpty()
    companyName: string

    @IsDate()
    @IsNotEmpty()
    @Transform(({value}) => value && new Date(value))
    @MaxDate(new Date())
    startDate: Date

    @ValidateIf((o) => o.isDoing !== true)
    @IsDate()
    @IsNotEmpty()
    @Transform(({value}) => value && new Date(value))
    @MaxDate(new Date())
    endDate: Date

    @IsBoolean()
    @IsOptional()
    isDoing?: boolean

    @IsString()
    @IsNotEmpty()
    jobDescription: string

}

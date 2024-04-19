import { Transform } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxDate } from "class-validator"

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

    @IsDate()
    @IsOptional()
    @Transform(({value}) => value && new Date(value))
    @MaxDate(new Date())
    endDate?: Date | null

    @IsString()
    @IsNotEmpty()
    jobDescription: string
}

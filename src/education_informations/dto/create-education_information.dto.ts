import { Transform } from "class-transformer"
import { IsDate, IsDateString, IsNotEmpty, IsString, MaxDate } from "class-validator"

export class CreateEducationInformationDto {
    @IsString()
    @IsNotEmpty()
    schoolName: string

    @IsString()
    @IsNotEmpty()
    specialization: string

    @IsString()
    @IsNotEmpty()
    degreeName: string

    @IsDate()
    @IsNotEmpty()
    @Transform( ({ value }) => value && new Date(value))
    @MaxDate(new Date())
    startDate: Date

    @IsDate()
    @IsNotEmpty()
    @Transform( ({ value }) => value && new Date(value))
    @MaxDate(new Date())
    endDate: Date
}

import { IsDateString, IsNotEmpty, IsString } from "class-validator"

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

    @IsDateString()
    @IsNotEmpty()
    startDate: Date

    @IsDateString()
    @IsNotEmpty()
    endDate: Date
}

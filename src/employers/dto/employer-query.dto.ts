import { IsOptional, IsString } from "class-validator"

export class EmployerQueryDto {
    @IsString()
    @IsOptional()
    companyName?: string

    @IsString()
    @IsOptional()
    companyLocation?: string

    @IsString()
    @IsOptional()
    careerField?: string
}
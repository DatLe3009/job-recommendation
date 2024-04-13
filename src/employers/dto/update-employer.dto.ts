import { IsOptional, IsString } from "class-validator";

export class UpdateEmployerDto {
    @IsString()
    @IsOptional()
    taxCode?: string;

    @IsString()
    @IsOptional()
    companyName?: string;

    @IsString()
    @IsOptional()
    companyLocation?: string;

    @IsString()
    @IsOptional()
    careerField?: string;

    @IsString()
    @IsOptional()
    logo?: string;

    @IsString()
    @IsOptional()
    banner?: string;

    @IsString()
    @IsOptional()
    description?: string;
}

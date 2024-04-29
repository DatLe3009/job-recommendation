import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateEmployerDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    taxCode?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    companyName?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    companyLocation?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    careerField?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    logo?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    banner?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    description?: string;
}

import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class EmployerQueryDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        nullable: true,
    })
    companyName?: string

    @IsString()
    @IsOptional()
    @ApiProperty({
        nullable: true,
    })
    companyLocation?: string

    @IsString()
    @IsOptional()
    @ApiProperty({
        nullable: true,
    })
    careerField?: string
}
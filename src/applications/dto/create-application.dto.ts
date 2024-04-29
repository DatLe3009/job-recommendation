import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApplicationType } from "src/shared/enums";

export class CreateApplicationDto {
    @IsEnum(ApplicationType)
    @IsNotEmpty()
    @ApiProperty()
    applicationType: ApplicationType

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "If the application type is online profile, then cv will be not available",
    })
    cv?: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsMobilePhone()
    @IsNotEmpty()
    @ApiProperty()
    phone: string
}

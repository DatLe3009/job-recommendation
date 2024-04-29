import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApplicationType } from "src/shared/enums";

export class CreateApplicationDto {
    @IsEnum(ApplicationType)
    @IsNotEmpty()
    applicationType: ApplicationType

    @IsString()
    @IsOptional()
    cv?: string

    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsMobilePhone()
    @IsNotEmpty()
    phone: string
}

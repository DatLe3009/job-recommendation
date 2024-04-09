import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from 'src/shared/enums';

export class SignupDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    confirmPassword: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    role: UserRole;
}

import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from 'src/shared/enums';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    role: UserRole;
}

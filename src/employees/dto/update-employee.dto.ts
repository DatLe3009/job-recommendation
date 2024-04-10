import { IsBoolean, IsOptional } from "class-validator";
import { UpdateUserDto } from "src/users/dto";

export class UpdateEmployeeDto extends UpdateUserDto {
    @IsBoolean()
    @IsOptional()
    isMarried?: boolean
}


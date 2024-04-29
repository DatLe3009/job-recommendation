import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";
import { UpdateUserDto } from "src/users/dto";

export class UpdateEmployeeDto extends UpdateUserDto {
    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    isMarried?: boolean
}


import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateEmployeeDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}

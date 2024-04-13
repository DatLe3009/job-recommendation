import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateEmployerDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}

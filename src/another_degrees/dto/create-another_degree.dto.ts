import { IsNotEmpty, IsString } from "class-validator"

export class CreateAnotherDegreeDto {
    @IsString()
    @IsNotEmpty()
    degreeName: string

    @IsString()
    @IsNotEmpty()
    level: string
}

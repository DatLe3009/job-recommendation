import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { ApprovalStatus } from "src/shared/enums";

export class UpdateApplicationDto {
    @IsEnum(ApprovalStatus)
    @IsOptional()
    @ApiProperty({
        nullable: true,
    })
    status?: ApprovalStatus
}

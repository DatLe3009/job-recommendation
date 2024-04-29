import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { ApprovalStatus } from "src/shared/enums";

export class AdminUpdateJobPostingDto {
    @IsEnum(ApprovalStatus)
    @IsOptional()
    @ApiProperty()
    status?: ApprovalStatus
}
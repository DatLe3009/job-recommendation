import { IsNotEmpty, IsString } from "class-validator";
import { CreateOnlineProfileDto } from "src/online_profiles/dto";

export class CreateAttachedDocumentDto extends CreateOnlineProfileDto {
    @IsString()
    @IsNotEmpty()
    cv: string;
}


import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDiaryDto {
    @IsOptional()
    @IsUUID()
    churchId?: string;
}

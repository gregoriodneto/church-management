import { IsOptional, IsString, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { ChurchRole } from '@prisma/client';

export class CreateChurchDto {
    @IsString()
    name: string;

    @IsDateString()
    foundationDate: string;

    @IsOptional()
    @IsEnum(ChurchRole)
    role?: ChurchRole;

    @IsOptional()
    @IsUUID()
    parentChurchId?: string;

    @IsOptional()
    @IsUUID()
    addressChurchId?: string;
}

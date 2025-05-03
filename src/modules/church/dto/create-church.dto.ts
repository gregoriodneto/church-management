import { IsOptional, IsString, IsEnum, IsUUID } from 'class-validator';
import { ChurchRole } from '@prisma/client';

export class CreateChurchDto {
    @IsString()
    name: string;

    @IsString()
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

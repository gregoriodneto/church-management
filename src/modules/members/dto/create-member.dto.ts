import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { PositionInTheChurch } from '@prisma/client';

export class CreateMemberDto {
    @IsString()
    name: string;

    @IsString()
    dateOfBirth: string;

    @IsOptional()
    @IsEnum(PositionInTheChurch)
    positionInTheChurch?: PositionInTheChurch;

    @IsOptional()
    @IsUUID()
    ddressMemberId?: string;

    @IsOptional()
    @IsUUID()
    contactMemberId?: string;
}

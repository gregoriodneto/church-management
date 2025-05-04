import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ChurchMinistry, ChurchMember, ChurchDepartament } from '@prisma/client';

export class CreateMemberDto {
    @IsString()
    name: string;

    @IsDateString()
    dateOfBirth: string;

    @IsOptional()
    @IsEnum(ChurchMinistry)
    churchMinistry?: ChurchMinistry[];

    @IsOptional()
    @IsEnum(ChurchMember)
    churchMember?: ChurchMember[];

    @IsOptional()
    @IsEnum(ChurchDepartament)
    churchDepartament?: ChurchDepartament[];

    @IsOptional()
    @IsUUID()
    ddressMemberId?: string;

    @IsOptional()
    @IsUUID()
    contactMemberId: string;
}

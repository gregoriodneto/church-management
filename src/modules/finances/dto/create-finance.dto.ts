import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { TypeContribution } from '@prisma/client';

export class CreateFinanceDto {
    @IsEnum(TypeContribution)
    description: TypeContribution;

    @IsNumber()
    value: number;

    @IsOptional()
    @IsUUID()
    churchId?: string;

    @IsOptional()
    @IsUUID()
    memberId?: string;
}

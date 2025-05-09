import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { TypeContribution } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFinanceDto {
    @ApiProperty({
        example: 'DIZIMO',
        enum: TypeContribution,
        description: 'Descrição do tipo de contribuição',
    })
    @IsEnum(TypeContribution)
    description: TypeContribution;

    @ApiProperty({
        example: 150.75,
        description: 'Valor da contribuição',
    })
    @IsNumber()
    value: number;
    
    @ApiPropertyOptional({
        example: 'bdc6fa47-fdf2-4f3d-b249-9eec7c843f3f',
        description: 'ID do membro contribuinte (opcional)',
    })
    @IsOptional()
    @IsUUID()
    memberId?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
    @ApiProperty({
        example: ['+5511999999999', '+5511988888888'],
        description: 'Lista de números de telefone com DDD e código do país',
    })
    @IsArray()
    @IsString({ each: true })
    numberContact: string[];

    @ApiPropertyOptional({
        example: 'contato@igreja.com',
        description: 'E-mail de contato (opcional)',
    })
    @IsOptional()
    @IsString()
    email?: string;
}

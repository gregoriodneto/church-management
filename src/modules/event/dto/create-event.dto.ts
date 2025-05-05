import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusEvent, TypeEvent } from '@prisma/client';
import {
    IsBoolean,
    IsDateString,
    IsOptional,
    IsString,
    IsUUID,
    IsArray,
    IsEnum,
} from 'class-validator';

export class CreateEventDto {
    @ApiProperty({
        example: 'Culto de Oração',
        description: 'Título do evento',
    })
    @IsString()
    title: string;
  
    @ApiProperty({
        example: 'Evento de oração para toda a igreja',
        description: 'Descrição do evento',
    })
    @IsString()
    description: string;
  
    @ApiProperty({
        example: '2025-05-10T18:00:00Z',
        description: 'Data e hora do evento (formato ISO 8601)',
    })
    @IsDateString()
    date: string;
  
    @ApiPropertyOptional({
        example: 'Igreja Central',
        description: 'Localização do evento',
    })
    @IsOptional()
    @IsString()
    location?: string;
  
    @ApiPropertyOptional({
        example: true,
        description: 'Se o evento é público ou não',
    })
    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;
  
    @ApiPropertyOptional({
        example: ['CULTO', 'EVANGELISMO'],
        description: 'Tipos de evento associados',
    })
    @IsOptional()
    @IsArray()
    @IsEnum(TypeEvent, { each: true })
    type?: string[];
  
    @ApiPropertyOptional({
        example: 'PLANEJADO',
        description: 'Status do evento',
    })
    @IsOptional()
    @IsEnum(StatusEvent)
    status?: string;

    @ApiPropertyOptional({
        example: '0c73fa3d-f0d9-4b1d-8b9b-98e727e0e3d2',
        description: 'ID do diário associado ao evento',
    })
    @IsOptional()
    @IsUUID()
    diaryId?: string;
}

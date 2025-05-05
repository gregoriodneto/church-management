import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDiaryDto {
    @ApiPropertyOptional({
        example: '0c73fa3d-f0d9-4b1d-8b9b-98e727e0e3d2',
        description: 'ID da igreja associada ao diário (opcional)',
    })
    @IsOptional()
    @IsUUID()
    churchId?: string;
}

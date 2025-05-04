import { IsOptional, IsString, IsEnum, IsUUID, IsDateString, IsDate } from 'class-validator';
import { ChurchRole } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateChurchDto {
    @ApiProperty({ example: 'Igreja Central' })
    @IsString()
    name: string;

    @ApiProperty({ example: '2000-04-01T00:00:00Z' })
    @IsDateString()
    foundationDate: string;

    @ApiPropertyOptional({ enum: ChurchRole })
    @IsOptional()
    @IsEnum(ChurchRole)
    role?: ChurchRole;

    @ApiPropertyOptional({ example: "934256a6-0217-4d2a-b842-6772e9761af4" })
    @IsOptional()
    @IsUUID()
    parentChurchId?: string;

    @ApiPropertyOptional({ example: "934256a6-0217-4d2a-b842-6772e9761af4" })
    @IsOptional()
    @IsUUID()
    addressChurchId?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAddressDto {
    @ApiProperty({ example: 'Rua das Flores' })
    @IsString()
    street: string;

    @ApiProperty({ example: '123A' })
    @IsString()
    numberStreet: string;

    @ApiProperty({ example: 'Centro' })
    @IsString()
    district: string;

    @ApiProperty({ example: 'São Paulo' })
    @IsString()
    city: string;

    @ApiProperty({ example: 'SP' })
    @IsString()
    state: string;
}

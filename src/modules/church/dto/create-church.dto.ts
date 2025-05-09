import { IsOptional, IsString, IsEnum, IsUUID, IsDateString, IsDate, ValidateNested } from 'class-validator';
import { ChurchRole } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { CreateContactDto } from 'src/modules/contact/dto/create-contact.dto';
import { Type } from 'class-transformer';

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
    addressChurchId?: string;

    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;

    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateContactDto)
    contact: CreateContactDto;
}

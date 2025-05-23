import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ChurchMinistry, ChurchMember, ChurchDepartament } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { CreateContactDto } from 'src/modules/contact/dto/create-contact.dto';

export class CreateMemberDto {
    @ApiProperty({
        example: 'João da Silva',
        description: 'Nome do membro',
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: '1990-05-10T00:00:00Z',
        description: 'Data de nascimento no formato ISO',
    })
    @IsDateString()
    dateOfBirth: string;

    @ApiPropertyOptional({
        example: ['PASTOR', 'DIACONO'],
        enum: ChurchMinistry,
        isArray: true,
        description: 'Ministérios aos quais o membro pertence (opcional)',
    })
    @IsOptional()
    @IsEnum(ChurchMinistry, { each: true })
    churchMinistry?: ChurchMinistry[];

    @ApiPropertyOptional({
        example: ['MUSICO', 'LIDER'],
        enum: ChurchMember,
        isArray: true,
        description: 'Funções do membro na igreja (opcional)',
    })
    @IsOptional()
    @IsEnum(ChurchMember, { each: true })
    churchMember?: ChurchMember[];

    @ApiPropertyOptional({
        example: ['JOVENS', 'MUSICA'],
        enum: ChurchDepartament,
        isArray: true,
        description: 'Departamentos que o membro participa (opcional)',
    })
    @IsOptional()
    @IsEnum(ChurchDepartament, { each: true })
    churchDepartament?: ChurchDepartament[];

    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;

    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateContactDto)
    contact: CreateContactDto;

    @ApiProperty({
        example: true,
        description: 'O Membro será um Usuário?',
    })
    @IsBoolean()
    isUser: boolean;

    @ApiProperty({
        example: 'joao123',
        description: 'Senha do usuario',
    })
    @IsString()
    password: string;
}

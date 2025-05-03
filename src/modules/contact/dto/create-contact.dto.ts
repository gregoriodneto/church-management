import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
    @IsArray()
    @IsString({ each: true })
    numberContact: string[];

    @IsOptional()
    @IsString()
    email?: string;
}

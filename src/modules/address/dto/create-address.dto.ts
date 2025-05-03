import { IsString } from 'class-validator';

export class CreateAddressDto {
    @IsString()
    street: string;

    @IsString()
    numberStreet: string;

    @IsString()
    district: string;

    @IsString()
    city: string;

    @IsString()
    state: string;
}

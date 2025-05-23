import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class Church {
    @IsString()
    name: string;

    @IsString()
    dateOfBirth: string;

    @IsInt()
    age: number;

    @IsOptional()
    @IsUUID()
    addressMemberId?: string;

    @IsOptional()
    @IsUUID()
    contactMemberId?: string;
}

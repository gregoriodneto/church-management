import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({
        example: 'joao@teste.com',
        description: 'Email do usuario',
    })
    @IsString()
    email: string;

    @ApiProperty({
        example: 'joao123',
        description: 'Senha do usuario',
    })
    @IsString()
    password: string;
}

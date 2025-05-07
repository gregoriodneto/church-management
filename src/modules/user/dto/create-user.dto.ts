import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateUserDto {
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

    @ApiProperty({
        example: 'a8f9e0b5-d0d9-4a9f-927e-6e8619dd7980',
        description: 'ID do membro que esta associado',
    })
    @IsUUID()
    memberId: string;
}

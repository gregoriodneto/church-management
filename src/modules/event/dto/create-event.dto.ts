import { StatusEvent, TypeEvent } from '@prisma/client';
import {
    IsBoolean,
    IsDateString,
    IsOptional,
    IsString,
    IsUUID,
    IsArray,
    IsEnum,
} from 'class-validator';

export class CreateEventDto {
    @IsString()
    title: string;
  
    @IsString()
    description: string;
  
    @IsDateString()
    date: string;
  
    @IsOptional()
    @IsString()
    location?: string;
  
    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;
  
    @IsOptional()
    @IsEnum(TypeEvent)
    type?: string[];
  
    @IsOptional()
    @IsEnum(StatusEvent)
    status?: string;

    @IsOptional()
    @IsUUID()
    diaryId?: string;
}

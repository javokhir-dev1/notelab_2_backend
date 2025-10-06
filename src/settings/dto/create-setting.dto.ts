import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateSettingDto {
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsOptional()
    @IsString()
    theme?: string;

    @IsOptional()
    @IsString()
    language?: string;
}

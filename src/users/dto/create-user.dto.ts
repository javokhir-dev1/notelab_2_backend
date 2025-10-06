import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @MinLength(6)
    password: string

    @IsOptional()
    @IsString()
    avatar_url?: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    role?: string
}

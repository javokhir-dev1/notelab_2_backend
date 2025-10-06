import { IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateNotebookDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    user_id: number

    @IsOptional()
    @IsBoolean()
    is_favorite?: boolean;
}

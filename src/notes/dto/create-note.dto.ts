import { IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateNoteDto {
    @IsNotEmpty()
    notebook_id: number;

    @IsNotEmpty()
    user_id: number

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    type: string

    @IsBoolean()
    is_pinned: boolean
}

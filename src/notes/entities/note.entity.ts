import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    notebook_id: number;

    @Column({ type: 'text' })
    content: string;

    @Column({ default: 'text' })
    type: string;

    @Column({ default: false })
    is_pinned: boolean;

    @Column({ default: false })
    favorite: boolean;
}

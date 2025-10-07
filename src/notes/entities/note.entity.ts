import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Notebook } from '../../notebooks/entities/notebook.entity';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

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

    @ManyToOne(() => User, (user) => user.notebooks, {
        onDelete: "CASCADE"
    })
    user: User

    @ManyToOne(() => Notebook, (notebook) => notebook.notes, {
        onDelete: "CASCADE"
    })
    notebook: Notebook
}

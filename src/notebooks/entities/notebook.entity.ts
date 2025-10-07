import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Note } from '../../notes/entities/note.entity';

@Entity()
export class Notebook {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: false })
    is_favorite: boolean;

    @OneToMany(() => Note, (note) => note.notebook )
    notes: Note[]

    @ManyToOne(() => User, (user) => user.notebooks, {
        onDelete: "CASCADE"
    })
    user: User
}

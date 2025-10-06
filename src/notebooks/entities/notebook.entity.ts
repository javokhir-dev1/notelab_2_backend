import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Notebook {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number

    @Column()
    title: string;

    @Column({ default: false })
    is_favorite: boolean;
}

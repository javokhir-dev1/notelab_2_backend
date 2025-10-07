import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ default: 'light' })
    theme: string;

    @Column({ default: 'en' })
    language: string;

    @OneToOne(() => User, (user) => user.setting)
    user: User
}

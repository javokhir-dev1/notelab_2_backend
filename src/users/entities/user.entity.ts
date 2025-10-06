import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column({ nullable: true })
    avatar_url: string

    @Column({ nullable: true })
    bio: string

    @Column({ default: "user" })
    role: string
}

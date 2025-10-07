import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Notebook } from "../../notebooks/entities/notebook.entity"
import { Setting } from "../../settings/entities/setting.entity"
import { Note } from "../../notes/entities/note.entity"

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

    @OneToMany(() => Notebook, (notebook) => notebook.user)
    notebooks: Notebook[]

    @OneToMany(() => Note, (note) => note.user)
    notes: Note[]

    @OneToOne(() => Setting, (setting) => setting.user, { cascade: true })
    @JoinColumn()
    setting: Setting

}

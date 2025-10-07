import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '../users/entities/user.entity';
import { Notebook } from '../notebooks/entities/notebook.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Notebook)
    private notebookRepo: Repository<Notebook>

  ) { }

  async create(dto: CreateNoteDto) {
    const { user_id, notebook_id, content, type, is_pinned } = dto

    const user = await this.userRepo.findOne({ where: { id: user_id } })

    if (!user) {
      throw new UnauthorizedException(`User with id: ${user_id} not found`)
    }

    const notebook = await this.notebookRepo.findOne({ where: { id: notebook_id } })

    if (!notebook) {
      throw new NotFoundException(`Notebook with id: ${notebook_id} not found`)
    }

    const note = this.noteRepo.create({
      user,
      notebook,
      content,
      type,
      is_pinned
    });
    return this.noteRepo.save(note);
  }

  findAll() {
    return this.noteRepo.find();
  }

  async findOne(id: number) {
    const note = await this.noteRepo.findOne({ where: { id } });
    if (!note) throw new NotFoundException('Note topilmadi');
    return note;
  }

  async update(id: number, dto: UpdateNoteDto) {
    const note = await this.findOne(id);
    Object.assign(note, dto);
    return this.noteRepo.save(note);
  }

  async remove(id: number) {
    const note = await this.findOne(id);
    return this.noteRepo.remove(note);
  }
}

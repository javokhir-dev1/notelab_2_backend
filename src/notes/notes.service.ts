import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,
  ) { }

  create(dto: CreateNoteDto) {
    const note = this.noteRepo.create(dto);
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

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities/note.entity';
import { User } from '../users/entities/user.entity';
import { Notebook } from '../notebooks/entities/notebook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, User, Notebook])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule { }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notebook } from './entities/notebook.entity';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';

@Injectable()
export class NotebooksService {
  constructor(
    @InjectRepository(Notebook)
    private notebookRepo: Repository<Notebook>,
  ) { }

  create(dto: CreateNotebookDto) {
    const notebook = this.notebookRepo.create(dto);
    return this.notebookRepo.save(notebook);
  }

  findAll() {
    return this.notebookRepo.find();
  }

  async findOne(id: number) {
    const notebook = await this.notebookRepo.findOne({ where: { id } });
    if (!notebook) throw new NotFoundException({message: "Notebook not found"});
    return notebook;
  }

  async update(id: number, dto: UpdateNotebookDto) {
    const notebook = await this.findOne(id);
    Object.assign(notebook, dto);
    return this.notebookRepo.save(notebook);
  }

  async remove(id: number) {
    const notebook = await this.findOne(id);
    return this.notebookRepo.remove(notebook);
  }
}

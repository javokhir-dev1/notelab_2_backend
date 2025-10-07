import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notebook } from './entities/notebook.entity';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotebooksService {
  constructor(
    @InjectRepository(Notebook)
    private notebookRepo: Repository<Notebook>,

    @InjectRepository(User)
    private userRepo: Repository<User>
  ) { }

  async create(dto: CreateNotebookDto) {
    const { user_id, title, is_favorite } = dto
    const user = await this.userRepo.findOne({ where: { id: user_id } })

    if (!user) {
      throw new UnauthorizedException(`User with id: ${user_id} not found`)
    }

    const notebook = this.notebookRepo.create({ title, is_favorite, user });
    return this.notebookRepo.save(notebook);
  }

  findAll() {
    return this.notebookRepo.find();
  }

  async findOne(id: number) {
    const notebook = await this.notebookRepo.findOne({ where: { id }, relations: ["user"] });
    if (!notebook) throw new NotFoundException({ message: "Notebook not found" });
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

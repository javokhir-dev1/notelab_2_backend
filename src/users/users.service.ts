import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>
  ) { }
  async findAll() {
    return await this.usersRepo.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException({ message: "User not found" })
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException({ message: `User id ${id} not found` });
    }

    Object.assign(user, updateUserDto)
    return await this.usersRepo.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    if (!user) {
      throw new UnauthorizedException({ message: "This user not registered" })
    }
    await this.usersRepo.remove(user)
    return { message: "User deleted succesfully" }
  }
}

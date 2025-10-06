import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService
  ) { }

  async register(registerDto: RegisterDto) {
    const { password, username } = registerDto

    const exists = await this.usersRepo.findOne({ where: { username } })

    if (exists) throw new ConflictException("This username is already taken")

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = this.usersRepo.create({ ...registerDto, password: hashedPassword })
    return this.usersRepo.save(newUser)
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { username: dto.username } })
    if (!user) throw new BadRequestException({ message: "Email or password incorrect" })

    const match = await bcrypt.compare(dto.password, user.password)

    if (!match) throw new BadRequestException({ message: "Email or password incorrect" })

    const payload = { id: user.id, username: user.username, role: user.role }

    const token = this.jwtService.sign(payload)

    return { message: "Logged in successfully", access_token: token }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private settingRepo: Repository<Setting>,
  ) { }

  create(dto: CreateSettingDto) {
    const setting = this.settingRepo.create(dto);
    return this.settingRepo.save(setting);
  }

  findAll() {
    return this.settingRepo.find();
  }

  async findOne(id: number) {
    const setting = await this.settingRepo.findOne({ where: { id } });
    if (!setting) throw new NotFoundException('Setting topilmadi');
    return setting;
  }

  async update(id: number, dto: UpdateSettingDto) {
    const setting = await this.findOne(id);
    Object.assign(setting, dto);
    return this.settingRepo.save(setting);
  }

  async remove(id: number) {
    const setting = await this.findOne(id);
    return this.settingRepo.remove(setting);
  }
}

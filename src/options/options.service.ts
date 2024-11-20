import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async create(createOptionDto: CreateOptionDto) {
    const optionData = await this.optionRepository.create(createOptionDto);
    return this.optionRepository.insert(optionData);
  }

  async findAll() {
    return await this.optionRepository.find({
      order: { price: 'DESC' },
    });
  }

  async findOne(id: number, name: string) {
    return await this.optionRepository.findOne({
      where: {
        serialNo: id,
        optionName: name,
      },
    });
  }

  async update(id: number, name: string, updateOptionDto: UpdateOptionDto) {
    const optionData = await this.optionRepository.findOne({
      where: {
        serialNo: id,
        optionName: name,
      },
    });

    if (!optionData) {
      throw new Error('Option not found');
    }

    const updateOption = await this.optionRepository.update(
      {
        serialNo: id,
        optionName: name,
      },
      updateOptionDto,
    );

    return updateOption;
  }

  async remove(id: number, name: string) {
    const optionData = await this.optionRepository.findOne({
      where: {
        serialNo: id,
        optionName: name,
      },
    });

    if (!optionData) {
      throw new Error('Option not found');
    }

    await this.optionRepository.remove(optionData);
    return { message: 'Delete success!!' };
  }
}

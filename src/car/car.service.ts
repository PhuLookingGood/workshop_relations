import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    const carData = await this.carRepository.create(createCarDto);
    return this.carRepository.insert(carData);
  }

  async findAll() {
    return await this.carRepository.find({
      order: { price: 'DESC' },
      relations: ['option'],
    });
  }

  async findOne(id: number) {
    const carData = await this.carRepository.findOne({
      where: {
        serialNo: id,
      },
      relations: ['option'],
    });
    return carData;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const carData = await this.carRepository.findOne({
      where: {
        serialNo: id,
      },
    });
    const data = {
      ...carData,
      ...updateCarDto,
    };
    const updateCar = await this.carRepository.save(data);
    return updateCar;
  }

  async remove(id: number) {
    const carData = await this.carRepository.findOne({
      where: {
        serialNo: id,
      },
      relations: ['option'],
    });
    const removeCar = this.carRepository.remove(carData);
    return removeCar;
  }
}

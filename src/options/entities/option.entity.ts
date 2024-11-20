import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Car } from 'src/car/entities/car.entity';

@Entity()
export class Option {
  @PrimaryColumn()
  serialNo: number;

  @PrimaryColumn()
  optionName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne((type) => Car, (car) => car.option, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'serialNo', referencedColumnName: 'serialNo' })
  car: Car;
}

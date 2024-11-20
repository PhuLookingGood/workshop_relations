import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Option } from 'src/options/entities/option.entity';

@Entity()
export class Car {
  @PrimaryColumn()
  serialNo: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany((type) => Option, (option) => option.car)
  option: Option[];
}

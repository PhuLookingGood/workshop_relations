import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { OptionsModule } from './options/options.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car/entities/car.entity';
import { Option } from './options/entities/option.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 22341,
      database: 'app_carDB',
      username: 'postgres',
      password: 'admin1234',
      entities: [Car, Option],
      synchronize: true,
    }),
    CarModule,
    OptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

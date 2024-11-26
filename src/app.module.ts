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
      host: '...',
      port: 1111111,
      database: 'app_db',
      username: '....',
      password: '...',
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

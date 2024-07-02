import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicService } from './medic.service';
import { MedicController } from './medic.controller';
import { Medic } from './medic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medic])],
  providers: [MedicService],
  controllers: [MedicController],
})
export class MedicModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { Treatment } from './treatment.entity';
import { Patient } from '../patient/patient.entity';
import { Medic } from '../medic/medic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Treatment, Patient, Medic])],
  providers: [TreatmentService],
  controllers: [TreatmentController],
  exports: [TypeOrmModule],
})
export class TreatmentModule {}

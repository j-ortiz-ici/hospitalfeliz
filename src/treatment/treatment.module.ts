// src/treatment/treatment.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from './treatment.entity';
import { TreatmentService } from './treatment.service';
import { Patient } from '../patient/patient.entity';
import { Medic } from '../medic/medic.entity';
import { PatientHistory } from '../patient-history/patient-history.entity'; // Import PatientHistory entity
import { TreatmentController } from './treatment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Treatment, Patient, Medic, PatientHistory]), // Ensure PatientHistory is included here
  ],
  providers: [TreatmentService],
  controllers: [TreatmentController],
})
export class TreatmentModule {}

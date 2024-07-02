// src/examination/examination.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Examination } from './examination.entity';
import { ExaminationService } from './examination.service';
import { Patient } from '../patient/patient.entity';
import { Medic } from '../medic/medic.entity';
import { PatientHistory } from '../patient-history/patient-history.entity'; // Import PatientHistory entity
import { ExaminationController } from './examination.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Examination, Patient, Medic, PatientHistory]), // Include PatientHistory here
  ],
  providers: [ExaminationService],
  controllers: [ExaminationController],
})
export class ExaminationModule {}

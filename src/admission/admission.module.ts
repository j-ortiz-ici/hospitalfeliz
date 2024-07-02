// src/admission/admission.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admission } from './admission.entity';
import { AdmissionService } from './admission.service';
import { Patient } from '../patient/patient.entity';
import { PatientHistory } from '../patient-history/patient-history.entity'; // Import PatientHistory entity
import { AdmissionController } from './admission.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admission, Patient, PatientHistory]), // Include PatientHistory here
  ],
  providers: [AdmissionService],
  controllers: [AdmissionController],
})
export class AdmissionModule {}

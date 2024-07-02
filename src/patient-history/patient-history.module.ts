// src/patient-history/patient-history.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientHistory } from './patient-history.entity';
import { PatientHistoryService } from './patient-history.service';
import { PatientHistoryController } from './patient-history.controller';
import { Patient } from '../patient/patient.entity'; // Import Patient entity

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientHistory, Patient]), // Ensure Patient and PatientHistory are included here
  ],
  providers: [PatientHistoryService], // Include PatientRepository as provider if needed
  controllers: [PatientHistoryController],
})
export class PatientHistoryModule {}

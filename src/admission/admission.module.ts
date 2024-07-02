import { Module } from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { AdmissionController } from './admission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admission } from './admission.entity';
import { Patient } from '../patient/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admission, Patient])],
  providers: [AdmissionService],
  controllers: [AdmissionController],
})
export class AdmissionModule {}

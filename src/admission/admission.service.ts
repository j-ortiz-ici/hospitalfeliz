// src/admission/admission.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admission } from './admission.entity';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto';
import { Patient } from '../patient/patient.entity';
import { PatientHistory } from '../patient-history/patient-history.entity';
import { EventType } from '../patient-history/event-type.enum';

@Injectable()
export class AdmissionService {
  constructor(
    @InjectRepository(Admission)
    private admissionRepository: Repository<Admission>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(PatientHistory)
    private patientHistoryRepository: Repository<PatientHistory>,
  ) {}

  async create(createAdmissionDto: CreateAdmissionDto): Promise<Admission> {
    const { patientId, ...rest } = createAdmissionDto;

    const patient = await this.patientRepository.findOneBy({ id: patientId });
    if (!patient) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }

    const admission = this.admissionRepository.create({
      ...rest,
      patient,
    });
    const savedAdmission = await this.admissionRepository.save(admission);

    await this.logHistory(patient, 'Created admission');

    return savedAdmission;
  }

  async findAll(): Promise<Admission[]> {
    return await this.admissionRepository.find({ relations: ['patient'] });
  }

  async findOne(id: number): Promise<Admission> {
    const admission = await this.admissionRepository.findOne({
      where: { id },
      relations: ['patient'],
    });
    if (!admission) {
      throw new HttpException('Admission not found', HttpStatus.NOT_FOUND);
    }
    return admission;
  }

  async update(
    id: number,
    updateAdmissionDto: UpdateAdmissionDto,
  ): Promise<Admission> {
    const admission = await this.admissionRepository.findOneBy({ id });
    if (!admission) {
      throw new HttpException('Admission not found', HttpStatus.NOT_FOUND);
    }

    if (updateAdmissionDto.patientId) {
      const patient = await this.patientRepository.findOneBy({
        id: updateAdmissionDto.patientId,
      });
      if (!patient) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }
      admission.patient = patient;
    }

    Object.assign(admission, updateAdmissionDto);
    const updatedAdmission = await this.admissionRepository.save(admission);

    await this.logHistory(admission.patient, 'Updated admission');

    return updatedAdmission;
  }

  async remove(id: number): Promise<void> {
    const admission = await this.admissionRepository.findOneBy({ id });
    if (!admission) {
      throw new HttpException('Admission not found', HttpStatus.NOT_FOUND);
    }
    await this.admissionRepository.remove(admission);

    await this.logHistory(admission.patient, 'Removed admission');
  }

  private async logHistory(
    patient: Patient,
    eventDescription: string,
  ): Promise<void> {
    const history = this.patientHistoryRepository.create({
      patient,
      eventType: EventType.Admission,
      eventDescription,
      eventDate: new Date(),
    });
    await this.patientHistoryRepository.save(history);
  }
}

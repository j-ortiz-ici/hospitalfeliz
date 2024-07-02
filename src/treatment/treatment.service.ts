// src/treatment/treatment.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Treatment } from './treatment.entity';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { Patient } from '../patient/patient.entity';
import { Medic } from '../medic/medic.entity';
import { PatientHistory } from '../patient-history/patient-history.entity';
import { EventType } from '../patient-history/event-type.enum';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(Treatment)
    private treatmentRepository: Repository<Treatment>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Medic)
    private medicRepository: Repository<Medic>,
    @InjectRepository(PatientHistory)
    private patientHistoryRepository: Repository<PatientHistory>,
  ) {}

  async create(createTreatmentDto: CreateTreatmentDto): Promise<Treatment> {
    const { patientId, medicId, ...rest } = createTreatmentDto;

    const patient = await this.patientRepository.findOneBy({ id: patientId });
    if (!patient) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }

    const medic = await this.medicRepository.findOneBy({ id: medicId });
    if (!medic) {
      throw new HttpException('Medic not found', HttpStatus.NOT_FOUND);
    }

    const treatment = this.treatmentRepository.create({
      ...rest,
      patient,
      medic,
    });
    const savedTreatment = await this.treatmentRepository.save(treatment);

    await this.logHistory(
      patient,
      `Created treatment: ${treatment.description}`,
    );

    return savedTreatment;
  }

  async findAll(): Promise<Treatment[]> {
    return await this.treatmentRepository.find({
      relations: ['patient', 'medic'],
    });
  }

  async findOne(id: number): Promise<Treatment> {
    const treatment = await this.treatmentRepository.findOne({
      where: { id },
      relations: ['patient', 'medic'],
    });
    if (!treatment) {
      throw new HttpException('Treatment not found', HttpStatus.NOT_FOUND);
    }
    return treatment;
  }

  async update(
    id: number,
    updateTreatmentDto: UpdateTreatmentDto,
  ): Promise<Treatment> {
    const treatment = await this.treatmentRepository.findOneBy({ id });
    if (!treatment) {
      throw new HttpException('Treatment not found', HttpStatus.NOT_FOUND);
    }

    if (updateTreatmentDto.patientId) {
      const patient = await this.patientRepository.findOneBy({
        id: updateTreatmentDto.patientId,
      });
      if (!patient) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }
      treatment.patient = patient;
    }

    if (updateTreatmentDto.medicId) {
      const medic = await this.medicRepository.findOneBy({
        id: updateTreatmentDto.medicId,
      });
      if (!medic) {
        throw new HttpException('Medic not found', HttpStatus.NOT_FOUND);
      }
      treatment.medic = medic;
    }

    Object.assign(treatment, updateTreatmentDto);
    const updatedTreatment = await this.treatmentRepository.save(treatment);

    await this.logHistory(
      treatment.patient,
      `Updated treatment: ${treatment.description}`,
    );

    return updatedTreatment;
  }

  async remove(id: number): Promise<void> {
    const treatment = await this.treatmentRepository.findOneBy({ id });
    if (!treatment) {
      throw new HttpException('Treatment not found', HttpStatus.NOT_FOUND);
    }
    await this.treatmentRepository.remove(treatment);

    await this.logHistory(
      treatment.patient,
      `Removed treatment: ${treatment.description}`,
    );
  }

  private async logHistory(
    patient: Patient,
    eventDescription: string,
  ): Promise<void> {
    const history = this.patientHistoryRepository.create({
      patient,
      eventType: EventType.Treatment,
      eventDescription,
      eventDate: new Date(),
    });
    await this.patientHistoryRepository.save(history);
  }
}

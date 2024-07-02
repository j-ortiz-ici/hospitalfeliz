// src/examination/examination.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Examination } from './examination.entity';
import { CreateExaminationDto } from './dto/create-examination.dto';
import { UpdateExaminationDto } from './dto/update-examination.dto';
import { Patient } from '../patient/patient.entity';
import { Medic } from '../medic/medic.entity';
import { PatientHistory } from '../patient-history/patient-history.entity';
import { EventType } from '../patient-history/event-type.enum';

@Injectable()
export class ExaminationService {
  constructor(
    @InjectRepository(Examination)
    private examinationRepository: Repository<Examination>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Medic)
    private medicRepository: Repository<Medic>,
    @InjectRepository(PatientHistory)
    private patientHistoryRepository: Repository<PatientHistory>,
  ) {}

  async create(
    createExaminationDto: CreateExaminationDto,
  ): Promise<Examination> {
    const { patientId, medicId, ...rest } = createExaminationDto;

    const patient = await this.patientRepository.findOneBy({ id: patientId });
    if (!patient) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }

    const medic = await this.medicRepository.findOneBy({ id: medicId });
    if (!medic) {
      throw new HttpException('Medic not found', HttpStatus.NOT_FOUND);
    }

    const examination = this.examinationRepository.create({
      ...rest,
      patient,
      medic,
    });
    const savedExamination = await this.examinationRepository.save(examination);

    await this.logHistory(
      patient,
      `Created examination of type ${examination.type}`,
    );

    return savedExamination;
  }

  async findAll(): Promise<Examination[]> {
    return await this.examinationRepository.find({
      relations: ['patient', 'medic'],
    });
  }

  async findOne(id: number): Promise<Examination> {
    const examination = await this.examinationRepository.findOne({
      where: { id },
      relations: ['patient', 'medic'],
    });
    if (!examination) {
      throw new HttpException('Examination not found', HttpStatus.NOT_FOUND);
    }
    return examination;
  }

  async update(
    id: number,
    updateExaminationDto: UpdateExaminationDto,
  ): Promise<Examination> {
    const examination = await this.examinationRepository.findOneBy({ id });
    if (!examination) {
      throw new HttpException('Examination not found', HttpStatus.NOT_FOUND);
    }

    if (updateExaminationDto.patientId) {
      const patient = await this.patientRepository.findOneBy({
        id: updateExaminationDto.patientId,
      });
      if (!patient) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }
      examination.patient = patient;
    }

    if (updateExaminationDto.medicId) {
      const medic = await this.medicRepository.findOneBy({
        id: updateExaminationDto.medicId,
      });
      if (!medic) {
        throw new HttpException('Medic not found', HttpStatus.NOT_FOUND);
      }
      examination.medic = medic;
    }

    Object.assign(examination, updateExaminationDto);
    const updatedExamination =
      await this.examinationRepository.save(examination);

    await this.logHistory(
      examination.patient,
      `Updated examination of type ${examination.type}`,
    );

    return updatedExamination;
  }

  async remove(id: number): Promise<void> {
    const examination = await this.examinationRepository.findOneBy({ id });
    if (!examination) {
      throw new HttpException('Examination not found', HttpStatus.NOT_FOUND);
    }
    await this.examinationRepository.remove(examination);

    await this.logHistory(
      examination.patient,
      `Removed examination of type ${examination.type}`,
    );
  }

  private async logHistory(
    patient: Patient,
    eventDescription: string,
  ): Promise<void> {
    const history = this.patientHistoryRepository.create({
      patient,
      eventType: EventType.Examination,
      eventDescription,
      eventDate: new Date(),
    });
    await this.patientHistoryRepository.save(history);
  }
}

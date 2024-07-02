// src/patient-history/patient-history.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientHistory } from './patient-history.entity';
import { CreatePatientHistoryDto } from './dto/create-patient-history.dto';

@Injectable()
export class PatientHistoryService {
  constructor(
    @InjectRepository(PatientHistory)
    private patientHistoryRepository: Repository<PatientHistory>,
  ) {}

  async create(
    createPatientHistoryDto: CreatePatientHistoryDto,
  ): Promise<PatientHistory> {
    const { eventType, eventDescription, eventDate, patient } =
      createPatientHistoryDto;
    const patientHistory = this.patientHistoryRepository.create({
      eventType,
      eventDescription,
      eventDate,
      patient,
    });
    return await this.patientHistoryRepository.save(patientHistory);
  }

  async findAllByPatientId(patientId: number): Promise<PatientHistory[]> {
    return await this.patientHistoryRepository.find({
      where: { patient: { id: patientId } },
      order: { eventDate: 'ASC' }, // Sort by eventDate in ascending order (chronological)
    });
  }

  async findOne(id: number): Promise<PatientHistory> {
    const patientHistory = await this.patientHistoryRepository.findOneBy({
      id,
    });
    if (!patientHistory) {
      throw new NotFoundException('Patient History not found');
    }
    return patientHistory;
  }

  async remove(id: number): Promise<void> {
    const result = await this.patientHistoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Patient History not found');
    }
  }

  async groupByPatientId(): Promise<Map<number, PatientHistory[]>> {
    const patientHistories = await this.patientHistoryRepository.find({
      relations: ['patient'], // Ensure patient relation is loaded
    });

    const groupedHistories = new Map<number, PatientHistory[]>();

    patientHistories.forEach((history) => {
      const patientId = history.patient.id;
      if (groupedHistories.has(patientId)) {
        groupedHistories.get(patientId).push(history);
      } else {
        groupedHistories.set(patientId, [history]);
      }
    });

    return groupedHistories;
  }
}

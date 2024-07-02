// src/patient/patient.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    try {
      const patient = this.patientRepository.create(createPatientDto);
      return await this.patientRepository.save(patient);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new HttpException(
          'Patient with this RUT already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Patient[]> {
    try {
      return await this.patientRepository.find();
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Patient> {
    try {
      const patient = await this.patientRepository.findOneBy({ id });
      if (!patient) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }
      return patient;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByRut(rut: string): Promise<Patient> {
    try {
      const patient = await this.patientRepository.findOne({ where: { rut } });
      if (!patient) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }
      return patient;
    } catch (error) {
      throw new HttpException(
        'Internal server error test',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    try {
      const result = await this.patientRepository.update(id, updatePatientDto);
      if (result.affected === 0) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }
      return this.patientRepository.findOneBy({ id });
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new HttpException(
          'Patient with this RUT already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.patientRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

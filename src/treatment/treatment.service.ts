import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Treatment } from './treatment.entity';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { Patient } from '../patient/patient.entity';
import { Medic } from '../medic/medic.entity';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(Treatment)
    private treatmentRepository: Repository<Treatment>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Medic)
    private medicRepository: Repository<Medic>,
  ) {}

  async create(createTreatmentDto: CreateTreatmentDto): Promise<Treatment> {
    try {
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
      return await this.treatmentRepository.save(treatment);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Treatment[]> {
    try {
      return await this.treatmentRepository.find({
        relations: ['patient', 'medic'],
      });
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Treatment> {
    try {
      const treatment = await this.treatmentRepository.findOne({
        where: { id },
        relations: ['patient', 'medic'],
      });
      if (!treatment) {
        throw new HttpException('Treatment not found', HttpStatus.NOT_FOUND);
      }
      return treatment;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateTreatmentDto: UpdateTreatmentDto,
  ): Promise<Treatment> {
    try {
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
      return await this.treatmentRepository.save(treatment);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.treatmentRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Treatment not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

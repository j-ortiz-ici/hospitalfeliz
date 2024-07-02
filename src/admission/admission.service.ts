import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admission } from './admission.entity';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto';
import { Patient } from '../patient/patient.entity';

@Injectable()
export class AdmissionService {
  constructor(
    @InjectRepository(Admission)
    private admissionRepository: Repository<Admission>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(createAdmissionDto: CreateAdmissionDto): Promise<Admission> {
    try {
      const { patientId, ...rest } = createAdmissionDto;

      const patient = await this.patientRepository.findOneBy({ id: patientId });
      if (!patient) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }

      const admission = this.admissionRepository.create({
        ...rest,
        patient,
      });
      return await this.admissionRepository.save(admission);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Admission[]> {
    try {
      return await this.admissionRepository.find({
        relations: ['patient'],
      });
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Admission> {
    try {
      const admission = await this.admissionRepository.findOne({
        where: { id },
        relations: ['patient'],
      });
      if (!admission) {
        throw new HttpException('Admission not found', HttpStatus.NOT_FOUND);
      }
      return admission;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateAdmissionDto: UpdateAdmissionDto,
  ): Promise<Admission> {
    try {
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
      return await this.admissionRepository.save(admission);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.admissionRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Admission not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

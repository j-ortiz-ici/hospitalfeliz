import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medic } from './medic.entity';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';

@Injectable()
export class MedicService {
  constructor(
    @InjectRepository(Medic)
    private medicRepository: Repository<Medic>,
  ) {}

  async create(createMedicDto: CreateMedicDto): Promise<Medic> {
    try {
      const medic = this.medicRepository.create(createMedicDto);
      return await this.medicRepository.save(medic);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new HttpException(
          'Medic with this RUT already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Medic[]> {
    try {
      return await this.medicRepository.find();
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Medic> {
    try {
      const medic = await this.medicRepository.findOneBy({ id });
      if (!medic) {
        throw new HttpException('Medic not found', HttpStatus.NOT_FOUND);
      }
      return medic;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateMedicDto: UpdateMedicDto): Promise<Medic> {
    try {
      const result = await this.medicRepository.update(id, updateMedicDto);
      if (result.affected === 0) {
        throw new HttpException('Medic not found', HttpStatus.NOT_FOUND);
      }
      return this.medicRepository.findOneBy({ id });
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new HttpException(
          'Medic with this RUT already exists',
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
      const result = await this.medicRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Medic not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

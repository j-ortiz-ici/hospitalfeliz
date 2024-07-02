// src/patient-history/patient-history.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PatientHistoryService } from './patient-history.service';
import { CreatePatientHistoryDto } from './dto/create-patient-history.dto';
import { PatientHistory } from './patient-history.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Historial del Paciente')
@Controller('patient-history')
export class PatientHistoryController {
  constructor(private readonly patientHistoryService: PatientHistoryService) {}

  @Post()
  async create(
    @Body() createPatientHistoryDto: CreatePatientHistoryDto,
  ): Promise<PatientHistory> {
    return this.patientHistoryService.create(createPatientHistoryDto);
  }

  @Get('patient/:patientId')
  async findAllByPatientId(
    @Param('patientId') patientId: string,
  ): Promise<PatientHistory[]> {
    const histories =
      await this.patientHistoryService.findAllByPatientId(+patientId);
    if (!histories || histories.length === 0) {
      throw new NotFoundException('Patient History not found');
    }
    return histories;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PatientHistory> {
    return this.patientHistoryService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.patientHistoryService.remove(+id);
  }
}

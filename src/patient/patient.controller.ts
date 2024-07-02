import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './patient.entity';

@ApiTags('Patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({
    status: 201,
    description: 'The patient has been successfully created.',
    type: Patient,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Post()
  async create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    try {
      return await this.patientService.create(createPatientDto);
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

  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({
    status: 200,
    description: 'Return all patients.',
    type: [Patient],
  })
  @Get()
  async findAll(): Promise<Patient[]> {
    try {
      return await this.patientService.findAll();
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Get a patient by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the patient.',
    type: Patient,
  })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Patient> {
    try {
      const patient = await this.patientService.findOne(+id);
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

  @Get('/rut/:rut')
  async findOneByRut(@Param('rut') rut: string): Promise<Patient> {
    try {
      const patient = await this.patientService.findOneByRut(rut);
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

  @ApiOperation({ summary: 'Update a patient by ID' })
  @ApiResponse({
    status: 200,
    description: 'The patient has been successfully updated.',
    type: Patient,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    try {
      const patient = await this.patientService.update(+id, updatePatientDto);
      if (!patient) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }
      return patient;
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

  @ApiOperation({ summary: 'Delete a patient by ID' })
  @ApiResponse({
    status: 200,
    description: 'The patient has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      const patient = await this.patientService.findOne(+id);
      if (!patient) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }
      return this.patientService.remove(+id);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

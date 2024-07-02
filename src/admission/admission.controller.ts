// src/admission/admission.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { Admission } from './admission.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admisiones')
@Controller('admissions')
export class AdmissionController {
  constructor(private readonly admissionService: AdmissionService) {}

  @Post()
  create(@Body() createAdmissionDto: CreateAdmissionDto): Promise<Admission> {
    return this.admissionService.create(createAdmissionDto);
  }

  @Get()
  findAll(): Promise<Admission[]> {
    return this.admissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Admission> {
    return this.admissionService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdmissionDto: Partial<Admission>,
  ): Promise<Admission> {
    return this.admissionService.update(+id, updateAdmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.admissionService.remove(+id);
  }
}

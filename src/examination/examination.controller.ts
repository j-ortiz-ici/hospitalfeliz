// src/examination/examination.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExaminationService } from './examination.service';
import { CreateExaminationDto } from './dto/create-examination.dto';
import { UpdateExaminationDto } from './dto/update-examination.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Examenes')
@Controller('examinations')
export class ExaminationController {
  constructor(private readonly examinationService: ExaminationService) {}

  @Post()
  create(@Body() createExaminationDto: CreateExaminationDto) {
    return this.examinationService.create(createExaminationDto);
  }

  @Get()
  findAll() {
    return this.examinationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.examinationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateExaminationDto: UpdateExaminationDto,
  ) {
    return this.examinationService.update(id, updateExaminationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.examinationService.remove(id);
  }
}

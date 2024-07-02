// src/examination/dto/create-examination.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateExaminationDto {
  @ApiProperty({ description: 'Date of examination' })
  @IsNotEmpty()
  examinationDate: Date;

  @ApiProperty({ description: 'Type of examination' })
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Results of the examination' })
  @IsNotEmpty()
  results: string;

  @ApiProperty({ description: 'ID of the patient' })
  @IsNotEmpty()
  patientId: number;

  @ApiProperty({ description: 'ID of the medic' })
  @IsNotEmpty()
  medicId: number;
}

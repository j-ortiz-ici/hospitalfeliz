// src/admission/dto/admission.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAdmissionDto {
  @ApiProperty({ description: 'Date of admission' })
  @IsNotEmpty()
  admissionDate: Date;

  @ApiProperty({ description: 'Initial evaluation' })
  @IsNotEmpty()
  initialEvaluation: string;

  @ApiProperty({ description: 'Critical status' })
  @IsNotEmpty()
  isCritical: boolean;

  @ApiProperty({ description: 'ID of the patient' })
  @IsNotEmpty()
  patientId: number;
}

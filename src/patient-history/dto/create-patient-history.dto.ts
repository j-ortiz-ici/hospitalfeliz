// src/patient-history/dto/create-patient-history.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsEnum, IsNumber } from 'class-validator';
import { EventType } from '../event-type.enum';
import { Patient } from '../../patient/patient.entity';

export class CreatePatientHistoryDto {
  @ApiProperty({ enum: EventType, description: 'Type of event' })
  @IsNotEmpty()
  @IsEnum(EventType)
  eventType: EventType;

  @ApiProperty({ description: 'Description of the event' })
  @IsNotEmpty()
  eventDescription: string;

  @ApiProperty({ description: 'Date of the event' })
  @IsNotEmpty()
  @IsDateString()
  eventDate: Date;

  @ApiProperty({ description: 'ID of the patient related to the event' })
  @IsNotEmpty()
  @IsNumber()
  patient: Patient;
}

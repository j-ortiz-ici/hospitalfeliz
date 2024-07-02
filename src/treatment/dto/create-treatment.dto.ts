import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTreatmentDto {
  @ApiProperty({ description: 'Description of the treatment' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Start date of the treatment' })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty({ description: 'End date of the treatment' })
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @ApiProperty({ description: 'Current status of the treatment' })
  @IsNotEmpty()
  currentStatus: string;

  @ApiProperty({ description: 'ID of the patient receiving the treatment' })
  @IsNotEmpty()
  patientId: number;

  @ApiProperty({ description: 'ID of the medic assigning the treatment' })
  @IsNotEmpty()
  medicId: number;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';

export class UpdateTreatmentDto {
  @ApiPropertyOptional({ description: 'Description of the treatment' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Start date of the treatment' })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiPropertyOptional({ description: 'End date of the treatment' })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiPropertyOptional({ description: 'Current status of the treatment' })
  @IsOptional()
  currentStatus?: string;

  @ApiPropertyOptional({
    description: 'ID of the patient receiving the treatment',
  })
  @IsOptional()
  patientId?: number;

  @ApiPropertyOptional({
    description: 'ID of the medic assigning the treatment',
  })
  @IsOptional()
  medicId?: number;
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CreateAdmissionDto } from './create-admission.dto';

export class UpdateAdmissionDto extends PartialType(CreateAdmissionDto) {
  @ApiProperty({ description: 'Date of admission', required: false })
  @IsOptional()
  @IsNotEmpty()
  admissionDate?: Date;

  @ApiProperty({ description: 'Initial evaluation', required: false })
  @IsOptional()
  @IsNotEmpty()
  initialEvaluation?: string;

  @ApiProperty({ description: 'Critical status', required: false })
  @IsOptional()
  @IsNotEmpty()
  isCritical?: boolean;

  @ApiProperty({ description: 'ID of the patient', required: false })
  @IsOptional()
  @IsNotEmpty()
  patientId?: number;
}

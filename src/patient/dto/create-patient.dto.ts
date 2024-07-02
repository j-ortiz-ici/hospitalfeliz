import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ description: 'Name of the patient' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Age of the patient' })
  @IsNotEmpty()
  age: number;

  @ApiProperty({ description: 'Gender of the patient' })
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ description: 'Address of the patient' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Contact number of the patient' })
  @IsNotEmpty()
  contactNumber: string;

  @ApiProperty({ description: 'Emergency contact of the patient' })
  @IsNotEmpty()
  emergencyContact: string;

  @ApiProperty({ description: 'Medical history of the patient' })
  @IsNotEmpty()
  medicalHistory: string;

  @ApiProperty({ description: 'Current condition of the patient' })
  @IsNotEmpty()
  currentCondition: string;

  @ApiProperty({
    description: 'RUT (Unique Tax Roll) of the patient',
    example: '12345678-9',
  })
  @IsNotEmpty()
  @Matches(/^\d{1,8}-[kK\d]$/, { message: 'Invalid RUT format' })
  rut: string;
}

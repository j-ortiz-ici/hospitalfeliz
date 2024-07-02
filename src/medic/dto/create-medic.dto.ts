import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateMedicDto {
  @ApiProperty({ description: 'Name of the medic' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Specialization of the medic' })
  @IsNotEmpty()
  specialization: string;

  @ApiProperty({ description: 'Contact number of the medic' })
  @IsNotEmpty()
  contactNumber: string;

  @ApiProperty({
    description: 'RUT (Unique Tax Roll) of the medic',
    example: '12345678-9',
  })
  @IsNotEmpty()
  @Matches(/^\d{1,8}-[kK\d]$/, { message: 'Invalid RUT format' })
  rut: string;
}

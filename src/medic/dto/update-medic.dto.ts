import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Matches, IsNotEmpty } from 'class-validator';

export class UpdateMedicDto {
  @ApiPropertyOptional({ description: 'Name of the medic' })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ description: 'Specialization of the medic' })
  @IsOptional()
  @IsNotEmpty()
  specialization?: string;

  @ApiPropertyOptional({ description: 'Contact number of the medic' })
  @IsOptional()
  @IsNotEmpty()
  contactNumber?: string;

  @ApiPropertyOptional({
    description: 'RUT (Unique Tax Roll) of the medic',
    example: '12345678-9',
  })
  @IsOptional()
  @Matches(/^\d{1,8}-[kK\d]$/, { message: 'Invalid RUT format' })
  rut?: string;
}

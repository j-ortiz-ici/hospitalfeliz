import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]), // Importa la entidad Patient para el manejo de TypeORM
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [TypeOrmModule], // Exporta TypeOrmModule para su uso en otros módulos si es necesario
})
export class PatientModule {}

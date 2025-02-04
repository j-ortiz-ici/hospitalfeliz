import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from './patient/patient.module';
import { TreatmentModule } from './treatment/treatment.module';
import { MedicModule } from './medic/medic.module';
import { AdmissionModule } from './admission/admission.module';
import { ExaminationModule } from './examination/examination.module';
import { PatientHistoryModule } from './patient-history/patient-history.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database.sqlite', // Adjust path if needed
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Used for development; ensures the database is synchronized with the entities
      logging: true, // Enable logging for debugging
      // Additional options for debugging
      retryAttempts: 5, // Number of times to retry connection
      retryDelay: 3000, // Delay between retries (in ms)
    }),
    PatientModule,
    TreatmentModule,
    MedicModule,
    AdmissionModule,
    ExaminationModule,
    PatientHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

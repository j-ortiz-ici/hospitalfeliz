// src/patient-history/patient-history.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { EventType } from './event-type.enum';

@Entity()
export class PatientHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  eventType: EventType;

  @Column({ nullable: false })
  eventDescription: string;

  @Column({ nullable: false })
  eventDate: Date;

  @ManyToOne(() => Patient, (patient) => patient.id, { nullable: false })
  patient: Patient;
}

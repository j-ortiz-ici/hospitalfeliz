// src/admission/admission.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from '../patient/patient.entity';

@Entity()
export class Admission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  admissionDate: Date;

  @Column({ nullable: false })
  initialEvaluation: string;

  @Column({ nullable: false })
  isCritical: boolean;

  @ManyToOne(() => Patient, (patient) => patient.id, { nullable: false })
  patient: Patient;
}

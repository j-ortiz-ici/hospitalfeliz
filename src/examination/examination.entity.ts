// src/examination/examination.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Medic } from '../medic/medic.entity';

@Entity()
export class Examination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  examinationDate: Date;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  results: string;

  @ManyToOne(() => Patient, (patient) => patient.id, { nullable: false })
  patient: Patient;

  @ManyToOne(() => Medic, (medic) => medic.id, { nullable: false })
  medic: Medic;
}

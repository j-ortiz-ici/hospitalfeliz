import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Medic } from '../medic/medic.entity';

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  startDate: Date;

  @Column({ nullable: false })
  endDate: Date;

  @Column({ nullable: false })
  currentStatus: string;

  @ManyToOne(() => Patient, (patient) => patient.id, {
    nullable: false,
  })
  patient: Patient;

  @ManyToOne(() => Medic, (medic) => medic.id, { nullable: false })
  medic: Medic;
}

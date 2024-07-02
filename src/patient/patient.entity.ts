import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  contactNumber: string;

  @Column({ nullable: false })
  emergencyContact: string;

  @Column({ nullable: false })
  medicalHistory: string;

  @Column({ nullable: false })
  currentCondition: string;

  @Column({ nullable: false, unique: true })
  rut: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;
}

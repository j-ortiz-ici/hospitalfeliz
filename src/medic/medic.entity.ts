import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Medic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  specialization: string;

  @Column({ nullable: false })
  contactNumber: string;

  @Column({ nullable: false, unique: true })
  rut: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;
}

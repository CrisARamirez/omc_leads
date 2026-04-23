import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LeadSource } from '../enums/lead-source.enum';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 150 })
  nombre!: string;

  @Column({ name: 'email', type: 'varchar', length: 150, unique: true })
  email!: string;

  @Column({ name: 'telefono', type: 'varchar', length: 20, nullable: true })
  telefono?: string;

  @Column({ name: 'fuente', type: 'enum', enum: LeadSource })
  fuente!: LeadSource;

  @Column({
    name: 'producto_interes',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  producto_interes?: string;

  @Column({
    name: 'presupuesto',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  presupuesto?: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updated_at?: Date;
}

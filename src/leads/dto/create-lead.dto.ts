import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

import { LeadSource } from '../enums/lead-source.enum';

export class CreateLeadDto {
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombre!: string;

  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  email!: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsEnum(LeadSource, {
    message:
      'Fuente inválida. Valores permitidos: instagram, facebook, landing_page, referido, otro',
  })
  fuente!: LeadSource;

  @IsOptional()
  @IsString()
  producto_interes?: string;

  @IsOptional()
  presupuesto?: number;
}

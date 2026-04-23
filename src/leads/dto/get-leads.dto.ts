import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

import { LeadSource } from '../enums/lead-source.enum';

export class GetLeadsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsEnum(LeadSource)
  fuente?: LeadSource;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class LeadIdParamDto {
  @IsUUID()
  id!: string;
}

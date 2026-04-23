import { IsDateString, IsEnum, IsOptional } from 'class-validator';

import { LeadSource } from '../enums/lead-source.enum';

export class AiSummaryDto {
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

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AiService } from '../ai/ai.service';
import { Lead } from './entities/lead.entity';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  controllers: [LeadsController],
  providers: [LeadsService, AiService],
})
export class LeadsModule {}

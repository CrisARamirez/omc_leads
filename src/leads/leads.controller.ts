import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { AiSummaryDto } from './dto/ai-summary.dto';
import { CreateLeadDto } from './dto/create-lead.dto';
import { GetLeadsQueryDto, LeadIdParamDto } from './dto/get-leads.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }

  @Get()
  findAll(@Query() query: GetLeadsQueryDto) {
    return this.leadsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param() params: LeadIdParamDto) {
    return this.leadsService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: LeadIdParamDto, @Body() dto: UpdateLeadDto) {
    return this.leadsService.update(params.id, dto);
  }

  @Delete(':id')
  remove(@Param() params: LeadIdParamDto) {
    return this.leadsService.remove(params.id);
  }

  @Get('stats')
  stats() {
    return this.leadsService.stats();
  }

  @Post('ai/summary')
  aiSummary(@Body() dto: AiSummaryDto) {
    return this.leadsService.aiSummary(dto);
  }
}

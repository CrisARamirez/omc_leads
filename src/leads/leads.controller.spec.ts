import { Test, TestingModule } from '@nestjs/testing';

import { AiSummaryDto } from './dto/ai-summary.dto';
import { CreateLeadDto } from './dto/create-lead.dto';
import { GetLeadsQueryDto, LeadIdParamDto } from './dto/get-leads.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

describe('LeadsController', () => {
  let controller: LeadsController;

  const mockLeadsService = {
    create: jest.fn((dto: CreateLeadDto) => ({
      id: '1',
      ...dto,
    })),

    findAll: jest.fn(() => []),

    findOne: jest.fn((id: string) => ({
      id,
      nombre: 'Test Lead',
    })),

    update: jest.fn((id: string, dto: UpdateLeadDto) => ({
      id,
      ...dto,
    })),

    remove: jest.fn((id: string) => ({
      id,
      deleted: true,
    })),

    stats: jest.fn(() => ({
      total: 10,
      promedioPresupuesto: 2500000,
    })),

    aiSummary: jest.fn(() => ({
      summary: 'Resumen IA generado',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [
        {
          provide: LeadsService,
          useValue: mockLeadsService,
        },
      ],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a lead', () => {
    const dto: CreateLeadDto = {
      nombre: 'Juan',
      email: 'juan@gmail.com',
      fuente: 'instagram' as any,
    };

    expect(controller.create(dto)).toEqual({
      id: '1',
      ...dto,
    });
  });

  it('should return all leads', () => {
    const query: GetLeadsQueryDto = {};
    expect(controller.findAll(query)).toEqual([]);
  });

  it('should return one lead', () => {
    const params: LeadIdParamDto = { id: '1' };
    expect(controller.findOne(params)).toEqual({
      id: '1',
      nombre: 'Test Lead',
    });
  });

  it('should update a lead', () => {
    const params: LeadIdParamDto = { id: '1' };
    const dto: UpdateLeadDto = { nombre: 'Updated' };

    expect(controller.update(params, dto)).toEqual({
      id: '1',
      nombre: 'Updated',
    });
  });

  it('should remove a lead', () => {
    const params: LeadIdParamDto = { id: '1' };

    expect(controller.remove(params)).toEqual({
      id: '1',
      deleted: true,
    });
  });

  it('should return stats', () => {
    expect(controller.stats()).toEqual({
      total: 10,
      promedioPresupuesto: 2500000,
    });
  });

  it('should return ai summary', () => {
    const dto: AiSummaryDto = {
      source: 'instagram',
    } as any;

    expect(controller.aiSummary(dto)).toEqual({
      summary: 'Resumen IA generado',
    });
  });
});

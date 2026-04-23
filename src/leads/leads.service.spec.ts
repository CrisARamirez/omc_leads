import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AiService } from '../ai/ai.service';
import { Lead } from './entities/lead.entity';
import { LeadsService } from './leads.service';

describe('LeadsService', () => {
  let service: LeadsService;

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
    count: jest.fn(),
    find: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockAiService = {
    generateLeadSummary: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: getRepositoryToken(Lead),
          useValue: mockRepository,
        },
        {
          provide: AiService,
          useValue: mockAiService,
        },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a lead', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.create.mockReturnValue({ nombre: 'Test' });
    mockRepository.save.mockResolvedValue({ id: '1', nombre: 'Test' });

    const result = await service.create({
      nombre: 'Test',
      email: 'test@gmail.com',
      fuente: 'instagram' as any,
    });

    expect(result).toEqual({ id: '1', nombre: 'Test' });
  });

  it('should throw conflict if email exists', async () => {
    mockRepository.findOne.mockResolvedValue({ id: '1' });

    await expect(
      service.create({
        nombre: 'Test',
        email: 'test@gmail.com',
        fuente: 'instagram' as any,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it('should return leads list', async () => {
    const qb: any = {
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
    };

    mockRepository.createQueryBuilder.mockReturnValue(qb);

    const result = await service.findAll({ page: 1, limit: 10 });

    expect(result).toEqual({
      data: [],
      total: 0,
      page: 1,
      limit: 10,
    });
  });

  it('should return one lead', async () => {
    mockRepository.findOne.mockResolvedValue({ id: '1' });

    const result = await service.findOne('1');

    expect(result).toEqual({ id: '1' });
  });

  it('should throw if lead not found', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne('1')).rejects.toBeInstanceOf(HttpException);
  });

  it('should update lead', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({ id: '1' } as any);
    mockRepository.save.mockResolvedValue({ id: '1', nombre: 'Updated' });

    const result = await service.update('1', { nombre: 'Updated' });

    expect(result).toEqual({ id: '1', nombre: 'Updated' });
  });

  it('should remove lead', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({ id: '1' } as any);
    mockRepository.softDelete.mockResolvedValue({ affected: 1 });

    const result = await service.remove('1');

    expect(result).toEqual({
      message: 'Lead eliminado correctamente',
    });
  });

  it('should return stats', async () => {
    mockRepository.count.mockResolvedValue(10);

    const qb: any = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([{ fuente: 'instagram', count: '5' }]),
      getRawOne: jest.fn().mockResolvedValue({ avg: '1000' }),
      where: jest.fn().mockReturnThis(),
      getCount: jest.fn().mockResolvedValue(3),
    };

    mockRepository.createQueryBuilder.mockReturnValue(qb);

    const result = await service.stats();

    expect(result.total).toBe(10);
    expect(result.ultimos7Dias).toBe(3);
  });

  it('should generate AI summary', async () => {
    mockRepository.find.mockResolvedValue([{ id: '1' }]);
    mockAiService.generateLeadSummary.mockResolvedValue('summary');

    const result = await service.aiSummary({});

    expect(result.summary).toBe('summary');
    expect(result.totalLeads).toBe(1);
  });
});

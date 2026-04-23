import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLeadDto } from './dto/create-lead.dto';
import { GetLeadsQueryDto } from './dto/get-leads.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async create(dto: CreateLeadDto) {
    try {
      const existing = await this.leadRepository.findOne({
        where: { email: dto.email },
      });

      if (existing) {
        throw new HttpException({ message: 'El email ya está registrado' }, HttpStatus.CONFLICT);
      }

      const lead = this.leadRepository.create(dto);
      return await this.leadRepository.save(lead);
    } catch (error) {
      throw new HttpException(
        { message: 'Error creando lead', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(query: GetLeadsQueryDto) {
    try {
      const { page = 1, limit = 10, fuente, startDate, endDate } = query;

      const qb = this.leadRepository.createQueryBuilder('lead');

      qb.where('lead.deleted_at IS NULL');

      if (fuente) {
        qb.andWhere('lead.fuente = :fuente', { fuente });
      }

      if (startDate && endDate) {
        qb.andWhere('lead.created_at BETWEEN :start AND :end', {
          start: startDate,
          end: endDate,
        });
      }

      qb.orderBy('lead.created_at', 'DESC')
        .skip((page - 1) * limit)
        .take(limit);

      const [data, total] = await qb.getManyAndCount();

      return {
        data,
        total,
        page: Number(page),
        limit: Number(limit),
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Error obteniendo leads', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const lead = await this.leadRepository.findOne({
        where: { id },
      });

      if (!lead) {
        throw new HttpException('Lead no encontrado', HttpStatus.NOT_FOUND);
      }

      return lead;
    } catch (error) {
      throw new HttpException(
        { message: 'Error obteniendo lead', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, dto: UpdateLeadDto) {
    try {
      const lead = await this.findOne(id);

      const updated = Object.assign(lead, dto);

      return await this.leadRepository.save(updated);
    } catch (error) {
      throw new HttpException(
        { message: 'Error actualizando lead', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const lead = await this.findOne(id);

      if (!lead) {
        throw new HttpException('Lead no encontrado', HttpStatus.NOT_FOUND);
      }

      await this.leadRepository.softDelete(id);

      return { message: 'Lead eliminado correctamente' };
    } catch (error) {
      throw new HttpException(
        { message: 'Error eliminando lead', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async stats() {
    try {
      const total = await this.leadRepository.count();

      const porFuente = await this.leadRepository
        .createQueryBuilder('lead')
        .select('lead.fuente', 'fuente')
        .addSelect('COUNT(*)', 'count')
        .groupBy('lead.fuente')
        .getRawMany();

      const promedio = await this.leadRepository
        .createQueryBuilder('lead')
        .select('AVG(lead.presupuesto)', 'avg')
        .getRawOne();

      const ultimos7Dias = await this.leadRepository
        .createQueryBuilder('lead')
        .where("lead.created_at >= NOW() - INTERVAL '7 days'")
        .getCount();

      return {
        total,
        porFuente,
        promedioPresupuesto: Number(promedio || 0),
        ultimos7Dias,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Error obteniendo estadísticas', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

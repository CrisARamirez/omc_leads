import { DataSource } from 'typeorm';

import { Lead } from '../leads/entities/lead.entity';
import { LeadSource } from '../leads/enums/lead-source.enum';

export const seedLeads = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Lead);

  const leads = [
    {
      nombre: 'Juan Pérez',
      email: 'juan@gmail.com',
      telefono: '3001234567',
      fuente: LeadSource.INSTAGRAM,
      producto_interes: 'CRM empresarial',
      presupuesto: 1500000,
    },
    {
      nombre: 'María Gómez',
      email: 'maria@gmail.com',
      fuente: LeadSource.FACEBOOK,
      producto_interes: 'Landing page',
      presupuesto: 2500000,
    },
    {
      nombre: 'Carlos Ruiz',
      email: 'carlos@gmail.com',
      fuente: LeadSource.LANDING_PAGE,
      producto_interes: 'Automatización',
      presupuesto: 3200000,
    },
    {
      nombre: 'Andrea López',
      email: 'andrea@gmail.com',
      telefono: '3205551234',
      fuente: LeadSource.REFERIDO,
      producto_interes: 'Chatbot',
      presupuesto: 1800000,
    },
    {
      nombre: 'Santiago Torres',
      email: 'santiago@gmail.com',
      fuente: LeadSource.OTRO,
      producto_interes: 'Inventario',
      presupuesto: 4000000,
    },
    {
      nombre: 'Laura Martínez',
      email: 'laura@gmail.com',
      fuente: LeadSource.INSTAGRAM,
      producto_interes: 'E-commerce',
      presupuesto: 5000000,
    },
    {
      nombre: 'Diego Fernández',
      email: 'diego@gmail.com',
      fuente: LeadSource.FACEBOOK,
      producto_interes: 'Landing de ventas',
      presupuesto: 1200000,
    },
    {
      nombre: 'Valentina Ruiz',
      email: 'valentina@gmail.com',
      fuente: LeadSource.LANDING_PAGE,
      producto_interes: 'Reservas',
      presupuesto: 2800000,
    },
    {
      nombre: 'Andrés Molina',
      email: 'andres@gmail.com',
      fuente: LeadSource.REFERIDO,
      producto_interes: 'CRM personalizado',
      presupuesto: 3500000,
    },
    {
      nombre: 'Camila Herrera',
      email: 'camila@gmail.com',
      fuente: LeadSource.OTRO,
      producto_interes: 'Dashboard',
      presupuesto: 4200000,
    },
  ];

  await repo.save(leads);

  console.log('🌱 Seed de leads ejecutado');
};

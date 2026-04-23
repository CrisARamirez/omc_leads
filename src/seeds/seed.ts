import { DataSource } from 'typeorm';

import { AppDataSource } from '../database/data-source'; // ajusta ruta
import { seedLeads } from './lead.seed';

async function runSeed() {
  try {
    const dataSource: DataSource = await AppDataSource.initialize();

    console.log('📦 Conexión a DB lista');

    await seedLeads(dataSource);

    console.log('✅ Seeds ejecutados correctamente');

    await dataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error ejecutando seed:', error);
    process.exit(1);
  }
}

runSeed();

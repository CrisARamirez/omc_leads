import 'dotenv/config';

import { AppDataSource } from './data-source';

async function testConnection() {
  try {
    await AppDataSource.initialize();
    console.log('Conexión a la BD exitosa');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error conectando a la BD:', error);
  }
}

testConnection();

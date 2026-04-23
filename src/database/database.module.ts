import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import { EnvConfig } from '../config/env.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvConfig>): DataSourceOptions => {
        const databaseUrl = config.get('DATABASE_URL');

        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            synchronize: false,
            migrationsRun: true,
            ssl: {
              rejectUnauthorized: false,
            },
          };
        }

        return {
          type: 'postgres',
          host: config.getOrThrow('DB_HOST'),
          port: config.getOrThrow<number>('DB_PORT'),
          username: config.getOrThrow('DB_USER'),
          password: config.getOrThrow('DB_PASSWORD'),
          database: config.getOrThrow('DB_NAME'),
          synchronize: false,
          migrationsRun: true,

          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        };
      },
    }),
  ],
})
export class DatabaseModule {}

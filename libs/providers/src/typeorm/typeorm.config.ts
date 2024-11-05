import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { ConfigService } from '@nestjs/config';

config({ path: join(cwd(), '.env') });
const configService: ConfigService = new ConfigService();

const options = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL');
  if (!url) {
    throw new Error('Missing database URL');
  }

  return {
    url,
    type: 'postgres',
    schema: 'public',
    logging: configService.get('IS_PROD') === 'false',
    entities: [],
    migrations: [join(cwd(), 'migrations', '**', '*migration.ts')],
    migrationsRun: true,
    migrationsTableName: 'migrations',
  };
};

export const AppDataSource = new DataSource(options());

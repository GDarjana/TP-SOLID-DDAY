import '../../../config/path-aliases/aliases';

import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { EntitiesList } from '@src/modules/database/config/entities-list';

config();

const configService = new ConfigService();

const getDatabase = (): string => {
  if (process.env.NODE_ENV === 'test') {
    return configService.get('DB_DATABASE_TEST');
  }

  return configService.get('DB_DATABASE');
};

const getSynchronize = (): boolean => {
  if (process.env.NODE_ENV === 'test') {
    return true;
  }
  return false;
};

export const createDataSourceConfigBase = (): DataSourceOptions => {
  const host = configService.get('DB_HOST');
  const port = configService.get('DB_PORT');
  const username = configService.get('DB_USERNAME');
  const password = configService.get('DB_PASSWORD');

  const database = getDatabase();
  const synchronize = true;

  return {
    type: 'postgres',
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    entities: EntitiesList,
    migrationsRun: false,
    logging: false,
    migrationsTableName: 'migration',
    migrations: ['src/modules/database/migration/*.js', 'dist/src/modules/database/migration/*.js'],
    synchronize: synchronize,
  };
};

const dataSourceConfigBase = createDataSourceConfigBase();

const dataSourceConfigTerminal = {
  ...dataSourceConfigBase,
  migrations: ['src/modules/database/migration/*.js', 'dist/src/modules/database/migration/*.js'],
};

export default new DataSource(dataSourceConfigTerminal);

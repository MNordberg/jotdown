import 'reflect-metadata';
import { DataSourceOptions } from 'typeorm';

export const DataSourceConfig: DataSourceOptions = {
  type: 'mssql',
  host: 'mnordberg.database.windows.net',
  port: 1433,
  username: 'mnordberg',
  password: '53AmSW2M',
  database: 'jotdown', // don't change the db name - it's created automatically via migration
  entities: ['./src/**/*.entity.ts'],
  migrations: ['./src/migrations/*.ts'],
  synchronize: false,
};

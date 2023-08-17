import 'reflect-metadata';
import { DataSourceOptions } from 'typeorm';

export const OrmConfig: DataSourceOptions = {
  type: 'mssql',
  host: 'mnordberg.database.windows.net',
  port: 1433,
  username: 'mnordberg',
  password: '53AmSW2M',
  database: 'jotdown',
  entities: ['./src/**/*.entity.ts'],
  migrations: ['./src/migrations/*.ts'],
  synchronize: false,
};

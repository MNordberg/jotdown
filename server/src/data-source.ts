import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { DataSourceConfig } from './data-source-config';

export const AppDataSource = new DataSource(DataSourceConfig);

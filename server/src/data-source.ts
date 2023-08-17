import "reflect-metadata"
import { DataSource } from "typeorm"
import { OrmConfig } from "./orm-config"

export const AppDataSource = new DataSource(OrmConfig)

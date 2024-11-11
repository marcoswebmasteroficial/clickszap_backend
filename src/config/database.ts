import { DataSource } from 'typeorm'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()
const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'sqlite' | 'postgres',
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_TYPE === 'sqlite' ? 'database.sqlite' : '',
  synchronize: true,
  logging: false,
  entities: [path.resolve(__dirname, '../models/*.ts')],
  migrations: [path.resolve(__dirname, '../migrations/*.ts')],
  subscribers: []
})

export { AppDataSource }

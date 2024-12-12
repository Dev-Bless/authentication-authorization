import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../models/userSchema';

const AppDataSource = new DataSource({
    type: process.env.TYPE as any,
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database:  process.env.DATABASE,
    entities: [User ||__dirname + '../../dist/models/*.js'],
    synchronize: true,
    logging: false,
})


export default AppDataSource

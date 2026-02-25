const { DataSource } = require('typeorm')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  datasource: new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: Boolean(process.env.DB_SYNCHRONIZE),
    migrations: [__dirname + '/src/app/migrations/*.{ts,js}'],
    entities: [__dirname + '/src/app/**/*.entity.{ts,js}'],
    subscribers: [__dirname + '/src/app/**/*.subscriber.{ts,js}'],
    logging: false,
  })
}

require('./src/dotenv');

const extension = process.env.MODE === 'production' ? 'js' : 'ts';
module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: false,
  entities: ['src/Entity/**/*' + extension],
  migrations: ['src/Migration/**/*' + extension],
  subscribers: ['src/Subscriber/**/*' + extension],
  cli: {
    entitiesDir: 'src/Entity',
    migrationsDir: 'src/Migration',
    subscribersDir: 'src/Subscriber',
  },
};

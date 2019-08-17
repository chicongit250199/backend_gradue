import { container } from './winston_new';

require('dotenv').config();

const dbLog = container.get('database');

const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
};

function dbLogging(str, time) {
  dbLog.info(str, time);
  dbLog.info(`Timed: ${time} ms`);
}

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: 'auto_care',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: pool,
    benchmark: true,
    logging: dbLogging,
    dialectOptions: {
      decimalNumbers: true
    }
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mssql',
    operatorsAliases: false,
    pool: pool
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: pool,
    benchmark: true,
    logging: dbLogging,
    dialectOptions: {
      decimalNumbers: true
    }
  }
};

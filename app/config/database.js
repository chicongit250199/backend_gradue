import { container } from './winston_new';

require('dotenv').config();

const dbLog = container.get('database');

const pool = {
  max: 5,
  min: 0,
  //acquire: 30000,
  idle: 10000
};

function dbLogging(str, time) {
  dbLog.info(str, time);
  dbLog.info(`Timed: ${time} ms`);
}

module.exports = {
  development: {
    username: process.env.dbUse || 'root',
    password: process.env.password || '123456',
    database: process.env.dbName || 'auto_care',
    host: process.env.host || 'localhost',
    port: process.env.port || '3306',
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
    host: 'root',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: pool
  },
  production: {
    username: process.env.dbUse,
    password: process.env.password,
    database: process.env.dbName,
    host: process.env.host,
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

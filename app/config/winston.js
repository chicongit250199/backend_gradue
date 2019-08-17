import * as _FS from 'fs';
import winston from 'winston';
import AppConf from './application';

require('winston-daily-rotate-file');

// check exist folder
if (!_FS.existsSync(AppConf.logFile.folder)) {
  _FS.mkdirSync(AppConf.logFile.folder);
}

// setting file log
const transport = new (winston.transports.DailyRotateFile)({
  filename: `${AppConf.logFile.folder}`.concat('/', AppConf.logFile.filename),
  datePattern: AppConf.logFile.datePattern,
  zippedArchive: AppConf.logFile.zippedArchive,
  handleExceptions: AppConf.logFile.handleExceptions,
  maxSize: AppConf.logFile.maxSize,
  maxFiles: AppConf.logFile.maxFiles,
  level: 'info'
});

const errorTransport = new (winston.transports.DailyRotateFile)({
  filename: `${AppConf.logFile.folder}`.concat('/', AppConf.logFile.errorFile),
  datePattern: AppConf.logFile.datePattern,
  zippedArchive: AppConf.logFile.zippedArchive,
  handleExceptions: AppConf.logFile.handleExceptions,
  maxSize: AppConf.logFile.maxSize,
  maxFiles: AppConf.logFile.maxFiles,
  level: 'error'
});

transport.on('rotate', (oldFilename, newFilename) => {
  console.log(new Date(), oldFilename, newFilename);
});

const logger = winston.createLogger({
  transports: [
    transport,
    errorTransport
  ],
  exitOnError: false
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: winston.format.simple()
  }));
}

module.exports = logger;

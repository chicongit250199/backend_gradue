import winston from 'winston';
import AppConf from './application';

require('winston-daily-rotate-file');

const { format } = winston;
const {
  combine, label, json, colorize, printf, timestamp
} = format;

export const container = new winston.Container();

container.add('database', {
  format: combine(
    label({ label: 'database' }),
    json()
  ),
  transports: [
    new (winston.transports.DailyRotateFile)({
      filename: `${AppConf.logFile.folder}`.concat('/database-%DATE%.log'),
      datePattern: AppConf.logFile.datePattern,
      zippedArchive: AppConf.logFile.zippedArchive,
      handleExceptions: AppConf.logFile.handleExceptions,
      maxSize: AppConf.logFile.maxSize,
      maxFiles: AppConf.logFile.maxFiles,
      level: 'info'
    })
  ]
});

container.add('http', {
  format: combine(
    label({ label: 'http' }),
    json()
  ),
  transports: [
    new (winston.transports.DailyRotateFile)({
      filename: `${AppConf.logFile.folder}`.concat('/http-%DATE%.log'),
      datePattern: AppConf.logFile.datePattern,
      zippedArchive: AppConf.logFile.zippedArchive,
      handleExceptions: AppConf.logFile.handleExceptions,
      maxSize: AppConf.logFile.maxSize,
      maxFiles: AppConf.logFile.maxFiles,
      level: 'info'
    })
  ]
});

container.add('mobile', {
  format: combine(
    label({ label: 'mobile' }),
    json()
  ),
  transports: [
    new (winston.transports.DailyRotateFile)({
      filename: `${AppConf.logFile.folder}`.concat('/mobile-%DATE%.log'),
      datePattern: AppConf.logFile.datePattern,
      zippedArchive: AppConf.logFile.zippedArchive,
      handleExceptions: AppConf.logFile.handleExceptions,
      maxSize: AppConf.logFile.maxSize,
      maxFiles: AppConf.logFile.maxFiles,
      level: 'info'
    })
  ]
});

container.add('scheduler', {
  format: combine(
    label({ label: 'scheduler' }),
    json()
  ),
  transports: [
    new (winston.transports.DailyRotateFile)({
      filename: `${AppConf.logFile.folder}`.concat('/scheduler-%DATE%.log'),
      datePattern: AppConf.logFile.datePattern,
      zippedArchive: AppConf.logFile.zippedArchive,
      handleExceptions: AppConf.logFile.handleExceptions,
      maxSize: AppConf.logFile.maxSize,
      maxFiles: AppConf.logFile.maxFiles,
      level: 'info'
    })
  ]
});

function devFormat() {
  const formatMessage = info => `${info.level} ${info.message}`;
  const formatError = info => `${info.level} ${info.message}\n\n${info.stack}\n`;
  const _format = info => (info instanceof Error ? formatError(info) : formatMessage(info));
  return combine(timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS'
  }), colorize(), printf(_format));
}

container.add('email', {
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS'
    }),
    label({ label: 'email' }),
    json()
  ),
  transports: [
    new (winston.transports.DailyRotateFile)({
      filename: `${AppConf.logFile.folder}`.concat('/email-%DATE%.log'),
      datePattern: AppConf.logFile.datePattern,
      zippedArchive: AppConf.logFile.zippedArchive,
      handleExceptions: AppConf.logFile.handleExceptions,
      maxSize: AppConf.logFile.maxSize,
      maxFiles: AppConf.logFile.maxFiles,
      level: 'info'
    })
  ]
});

container.add('sms', {
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS'
    }),
    label({ label: 'sms' }),
    json()
  ),
  transports: [
    new (winston.transports.DailyRotateFile)({
      filename: `${AppConf.logFile.folder}`.concat('/sms-%DATE%.log'),
      datePattern: AppConf.logFile.datePattern,
      zippedArchive: AppConf.logFile.zippedArchive,
      handleExceptions: AppConf.logFile.handleExceptions,
      maxSize: AppConf.logFile.maxSize,
      maxFiles: AppConf.logFile.maxFiles,
      level: 'info'
    })
  ]
});

container.add('payapp', {
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS'
    }),
    label({ label: 'sms' }),
    json()
  ),
  transports: [
    new (winston.transports.DailyRotateFile)({
      filename: `${AppConf.logFile.folder}`.concat('/payapp-%DATE%.log'),
      datePattern: AppConf.logFile.datePattern,
      zippedArchive: AppConf.logFile.zippedArchive,
      handleExceptions: AppConf.logFile.handleExceptions,
      maxSize: AppConf.logFile.maxSize,
      maxFiles: AppConf.logFile.maxFiles,
      level: 'info'
    })
  ]
});

container.add('event', {
  format: devFormat(),
  transports: [
    new (winston.transports.DailyRotateFile)({
      filename: `${AppConf.logFile.folder}`.concat('/event-%DATE%.log'),
      datePattern: AppConf.logFile.datePattern,
      zippedArchive: AppConf.logFile.zippedArchive,
      handleExceptions: AppConf.logFile.handleExceptions,
      maxSize: AppConf.logFile.maxSize,
      maxFiles: AppConf.logFile.maxFiles,
      level: 'info'
    })
  ]
});

const httpLog = container.get('http');

export const httpStream = {
  write: function httpLogStream(message) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    httpLog.info(message);
  }
};

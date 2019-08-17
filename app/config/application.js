module.exports = {
  hostname: '0.0.0.0',
  port: 3000,
  fileUploadDir: './uploads/',
  emailFileUploadDir: './public/uploads/',
  COIN_MARKET: {
    API: {
      QUOTES: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
    },
    KEY: 'b70813fd-7f41-4b00-8408-57fa8a388a20'
  },
  logFile: {
    folder: 'logs/auto-care',
    filename: 'mlm-%DATE%.log',
    errorFile: 'error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    handleExceptions: true,
    maxSize: '10m',
    maxFiles: '7d'
  },
  sessionTimeout: 60 * 60 * 1000,
  JWT: {
    secret: 'TWOR!#$IERFLD'
  }
};

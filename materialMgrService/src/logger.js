const log4js = require('log4js')

log4js.configure({
  pm2: true,
  appenders: { cheese: { type: 'file', filename: 'logs/cheese.log' }, console: { type: 'console'} },
  categories: { default: { appenders: ['cheese', 'console'], level: 'error' } }
});

const logger = log4js.getLogger('[material service]')

module.exports = logger

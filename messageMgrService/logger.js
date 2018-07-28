const log4js = require('log4js')

log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' }, console: { type: 'console'} },
  categories: { default: { appenders: ['cheese', 'console'], level: 'error' } }
});

const logger = log4js.getLogger('cheese')

module.exports = logger

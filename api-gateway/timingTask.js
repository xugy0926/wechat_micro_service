const Rx = require('rx')
const axios = require('axios')

const logger = require('./logger')
const serviceConfig = require('./service_config')

const interval = Rx.Observable.interval
const timer = Rx.Observable.timer

const updateIps = async (app) => {
  try {
    await axios.get(`${serviceConfig['/client']}/client/ips`)
      .then(response => response.data)
      .then(({ ips }) => { app.white_ips = ips })
  } catch (err) {
    logger.error(new Error(err.message || 'fetch ips error.'))
  }
}

const start = (app) => {
  timer(5000).subscribe(() => {
    updateIps(app)
    interval(60 * 60 * 1000).subscribe(() => {
      updateIps(app)
    })
  })
}

module.exports = { start }

const Rx = require('rx')
const axios = require('axios')

const logger = require('./logger')
const serviceConfig = require('./service_config')

const interval = Rx.Observable.interval

const updateIps = async (app) => {
  try {
    await axios.get(`${serviceConfig['/client']}/client/ips`)
      .then(response => response.data)
      .then(({ ips }) => { app.white_ips = ips })
  } catch (err) {
    logger.error(err)
  }
}

const start = (app) => {
  interval(5 * 1000).subscribe(() => {
    updateIps(app)
  })
}

module.exports = { start }

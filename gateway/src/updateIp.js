const Rx = require('rx')
const axios = require('axios')

const logger = require('./logger')
const serviceURL = require('./serviceURL')

const interval = Rx.Observable.interval
const timer = Rx.Observable.timer

const updateIps = async (app) => {
  try {
    await axios.get(`${serviceURL['/client']}/client/ips/sync`)
      .then(response => response.data)
      .then(({ ips }) => { app.whiteips = ips })
  } catch (err) {
    logger.error(new Error(err.message || 'fetch ips error.'))
  }
}

const start = (app) => {
  timer(2000).subscribe(() => {
    updateIps(app)
    interval(60 * 60 * 1000).subscribe(() => {
      updateIps(app)
    })
  })
}

module.exports = { start }
